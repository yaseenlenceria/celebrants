import { searchMapsPlaces, LivePlaceData } from './mapsDataApi';

export interface ExportedCelebrant {
  businessId: string;
  name: string;
  fullAddress?: string;
  city: string;
  country: string;
  rating?: number;
  reviewCount?: number;
  website?: string;
  placeId?: string;
  placeLink?: string;
  photos: string[];
  type: string;
  coordinates?: { lat: number; lng: number };
}

export interface ExportProgress {
  currentCity: string;
  cityIndex: number;
  totalCities: number;
  celebrantsInCity: number;
  totalCelebrants: number;
  status: 'fetching' | 'processing' | 'complete' | 'error';
  error?: string;
}

export interface ExportResult {
  version: string;
  lastUpdated: string;
  source: string;
  metadata: {
    totalCelebrants: number;
    countries: string[];
    cities: string[];
    exportDuration: string;
  };
  celebrants: ExportedCelebrant[];
}

// Cities to fetch from
const CITIES_TO_FETCH = [
  { name: 'London', lat: 51.5074, lng: -0.1278, country: 'UK' },
  { name: 'Manchester', lat: 53.4808, lng: -2.2426, country: 'UK' },
  { name: 'Birmingham', lat: 52.4862, lng: -1.8904, country: 'UK' },
  { name: 'Edinburgh', lat: 55.9533, lng: -3.1883, country: 'UK' },
  { name: 'Glasgow', lat: 55.8642, lng: -4.2518, country: 'UK' },
  { name: 'Cardiff', lat: 51.4816, lng: -3.1791, country: 'UK' },
  { name: 'Bristol', lat: 51.4545, lng: -2.5879, country: 'UK' },
  { name: 'Leeds', lat: 53.8008, lng: -1.5491, country: 'UK' },
  { name: 'Liverpool', lat: 53.4084, lng: -2.9916, country: 'UK' },
  { name: 'Dublin', lat: 53.3498, lng: -6.2603, country: 'Ireland' },
  { name: 'Cork', lat: 51.8985, lng: -8.4756, country: 'Ireland' },
  { name: 'Galway', lat: 53.2707, lng: -9.0568, country: 'Ireland' },
  { name: 'Belfast', lat: 54.5973, lng: -5.9301, country: 'UK' },
];

const CELEBRANT_TYPES = [
  'wedding celebrant',
  'funeral celebrant',
  'naming celebrant',
];

// Deduplicate by businessId
const deduplicateCelebrants = (celebrants: ExportedCelebrant[]): ExportedCelebrant[] => {
  const seen = new Set<string>();
  return celebrants.filter((celebrant) => {
    if (seen.has(celebrant.businessId)) {
      return false;
    }
    seen.add(celebrant.businessId);
    return true;
  });
};

// Main export function
export const exportAllCelebrants = async (
  onProgress?: (progress: ExportProgress) => void
): Promise<ExportResult> => {
  const startTime = Date.now();
  const allCelebrants: ExportedCelebrant[] = [];

  try {
    for (let cityIndex = 0; cityIndex < CITIES_TO_FETCH.length; cityIndex++) {
      const city = CITIES_TO_FETCH[cityIndex];

      onProgress?.({
        currentCity: city.name,
        cityIndex: cityIndex + 1,
        totalCities: CITIES_TO_FETCH.length,
        celebrantsInCity: 0,
        totalCelebrants: allCelebrants.length,
        status: 'fetching',
      });

      console.log(`[Export] Fetching celebrants for ${city.name}...`);

      // Fetch celebrants for this city (try to get 50-100 results)
      try {
        const results = await searchMapsPlaces({
          query: 'wedding celebrant',
          country: city.country === 'Ireland' ? 'ie' : 'uk',
          lang: 'en',
          limit: 20,
          lat: city.lat,
          lng: city.lng,
          zoom: 11,
          offset: 0,
        });

        console.log(`[Export] Found ${results.length} celebrants in ${city.name}`);

        // Convert to export format
        const exportedResults: ExportedCelebrant[] = results.map((result) => ({
          businessId: result.businessId,
          name: result.name,
          fullAddress: result.fullAddress,
          city: city.name,
          country: city.country,
          rating: result.rating,
          reviewCount: result.reviewCount,
          website: result.website,
          placeId: result.placeId,
          placeLink: result.placeLink,
          photos: result.photos || [],
          type: 'Wedding Celebrant',
          coordinates: result.coordinates,
        }));

        allCelebrants.push(...exportedResults);

        onProgress?.({
          currentCity: city.name,
          cityIndex: cityIndex + 1,
          totalCities: CITIES_TO_FETCH.length,
          celebrantsInCity: results.length,
          totalCelebrants: allCelebrants.length,
          status: 'processing',
        });

        // Small delay to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`[Export] Error fetching ${city.name}:`, error);
        // Continue with other cities even if one fails
      }
    }

    // Deduplicate
    const deduplicated = deduplicateCelebrants(allCelebrants);
    console.log(`[Export] Total celebrants after deduplication: ${deduplicated.length}`);

    // Calculate metadata
    const countries = Array.from(new Set(deduplicated.map((c) => c.country)));
    const cities = Array.from(new Set(deduplicated.map((c) => c.city)));
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    const result: ExportResult = {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      source: 'RapidAPI Maps Data',
      metadata: {
        totalCelebrants: deduplicated.length,
        countries,
        cities,
        exportDuration: `${duration} seconds`,
      },
      celebrants: deduplicated,
    };

    onProgress?.({
      currentCity: 'Complete',
      cityIndex: CITIES_TO_FETCH.length,
      totalCities: CITIES_TO_FETCH.length,
      celebrantsInCity: 0,
      totalCelebrants: deduplicated.length,
      status: 'complete',
    });

    return result;
  } catch (error) {
    console.error('[Export] Fatal error during export:', error);
    onProgress?.({
      currentCity: 'Error',
      cityIndex: 0,
      totalCities: CITIES_TO_FETCH.length,
      celebrantsInCity: 0,
      totalCelebrants: allCelebrants.length,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
};
