import { celebrants as baseCelebrants, CelebrantProfile } from './celebrantsData';
import {
  fetchPlaceSnapshot,
  searchMapsPlaces,
  LivePlaceData,
  LivePlaceReview,
} from './mapsDataApi';
import staticDataJson from '../data/celebrants-live.json';

export type { LivePlaceData, LivePlaceReview } from './mapsDataApi';

interface StaticDataFile {
  version: string;
  lastUpdated: string | null;
  source: string;
  metadata: {
    totalCelebrants: number;
    countries: string[];
    cities: string[];
    exportDuration: string;
  };
  celebrants: Array<{
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
  }>;
}

export interface EnrichedCelebrant extends CelebrantProfile {
  slug: string;
  livePlace?: LivePlaceData;
  googleUrl?: string;
  isLiveSearch?: boolean;
}

interface LiveSourceConfig {
  businessId: string;
  placeId?: string;
  country?: string;
  lang?: string;
}

const liveSources: Partial<Record<number, LiveSourceConfig>> = {};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/-{2,}/g, '-');

let cachedCelebrants: EnrichedCelebrant[] | null = null;

const hydrateFromApi = async (celebrant: CelebrantProfile): Promise<EnrichedCelebrant> => {
  const slug = celebrant.slug || slugify(`${celebrant.name}-${celebrant.city}`);
  const liveConfig = liveSources[celebrant.id];

  if (!liveConfig) {
    return { ...celebrant, slug };
  }

  try {
    const livePlace = await fetchPlaceSnapshot({ ...liveConfig, lang: liveConfig.lang || 'en' });
    return {
      ...celebrant,
      slug,
      livePlace,
      rating: livePlace.rating ?? celebrant.rating,
      location: livePlace.fullAddress || celebrant.location,
      website: livePlace.website || celebrant.website,
      image: livePlace.photos[0] || celebrant.image,
      googleUrl: livePlace.placeLink,
    };
  } catch (error) {
    console.error('Failed to hydrate celebrant from RapidAPI', celebrant.id, error);
    return { ...celebrant, slug };
  }
};

export const getCelebrants = async (): Promise<EnrichedCelebrant[]> => {
  if (cachedCelebrants) return cachedCelebrants;
  const hydrated = await Promise.all(baseCelebrants.map((celebrant) => hydrateFromApi(celebrant)));
  cachedCelebrants = hydrated;
  return hydrated;
};

export const getCelebrantBySlug = async (slugOrId: string): Promise<EnrichedCelebrant | undefined> => {
  // First check static curated celebrants
  const list = await getCelebrants();
  const numericId = Number(slugOrId);
  const staticMatch = list.find((celebrant) => celebrant.slug === slugOrId || celebrant.id === numericId);

  if (staticMatch) {
    return staticMatch;
  }

  // If not found in static, check all cached live results in localStorage
  const keys = Object.keys(localStorage);
  const liveCacheKeys = keys.filter(key => key.startsWith('live:'));

  for (const key of liveCacheKeys) {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) continue;

      const results: EnrichedCelebrant[] = JSON.parse(cached);
      const liveMatch = results.find((celebrant) => celebrant.slug === slugOrId || celebrant.id === numericId);

      if (liveMatch) {
        return liveMatch;
      }
    } catch (e) {
      // Skip invalid cache entries
      continue;
    }
  }

  return undefined;
};

const countryCoords: Record<'UK' | 'Ireland', { lat: number; lng: number }> = {
  UK: { lat: 54.0, lng: -2.0 },
  Ireland: { lat: 53.35, lng: -6.26 },
};

const cityCoords: Record<string, { lat: number; lng: number; country: 'UK' | 'Ireland' }> = {
  london: { lat: 51.5074, lng: -0.1278, country: 'UK' },
  manchester: { lat: 53.4808, lng: -2.2426, country: 'UK' },
  birmingham: { lat: 52.4862, lng: -1.8904, country: 'UK' },
  edinburgh: { lat: 55.9533, lng: -3.1883, country: 'UK' },
  glasgow: { lat: 55.8642, lng: -4.2518, country: 'UK' },
  cardiff: { lat: 51.4816, lng: -3.1791, country: 'UK' },
  belfast: { lat: 54.5973, lng: -5.9301, country: 'UK' },
  bristol: { lat: 51.4545, lng: -2.5879, country: 'UK' },
  leeds: { lat: 53.8008, lng: -1.5491, country: 'UK' },
  newcastle: { lat: 54.9783, lng: -1.6174, country: 'UK' },
  york: { lat: 53.959, lng: -1.0815, country: 'UK' },
  bath: { lat: 51.3758, lng: -2.3599, country: 'UK' },
  cork: { lat: 51.8985, lng: -8.4756, country: 'Ireland' },
  galway: { lat: 53.2707, lng: -9.0568, country: 'Ireland' },
  dublin: { lat: 53.3498, lng: -6.2603, country: 'Ireland' },
  limerick: { lat: 52.6638, lng: -8.6267, country: 'Ireland' },
  waterford: { lat: 52.2593, lng: -7.1101, country: 'Ireland' },
  killarney: { lat: 52.0595, lng: -9.5045, country: 'Ireland' },
  kilkenny: { lat: 52.6541, lng: -7.2448, country: 'Ireland' },
  sligo: { lat: 54.2766, lng: -8.4761, country: 'Ireland' },
  wexford: { lat: 52.3369, lng: -6.4633, country: 'Ireland' },
  dagenham: { lat: 51.5404, lng: 0.1557, country: 'UK' },
  barking: { lat: 51.5363, lng: 0.0808, country: 'UK' },
  abbeywood: { lat: 51.491, lng: 0.12, country: 'UK' },
  thamesmead: { lat: 51.5, lng: 0.12, country: 'UK' },
  erith: { lat: 51.48, lng: 0.18, country: 'UK' },
};

// Function to get celebrants from static file
export const getCelebrantsFromStaticFile = (): EnrichedCelebrant[] => {
  const staticData = staticDataJson as StaticDataFile;

  if (!staticData.celebrants || staticData.celebrants.length === 0) {
    console.log('[getCelebrantsFromStaticFile] No celebrants in static file');
    return [];
  }

  console.log(`[getCelebrantsFromStaticFile] Loaded ${staticData.celebrants.length} celebrants from static file`);
  console.log(`[getCelebrantsFromStaticFile] Last updated: ${staticData.lastUpdated}`);

  return staticData.celebrants.map((celebrant, index) => {
    const slug = slugify(`${celebrant.name}-${celebrant.city}-${celebrant.businessId}`);
    const livePlace: LivePlaceData = {
      businessId: celebrant.businessId,
      name: celebrant.name,
      fullAddress: celebrant.fullAddress,
      coordinates: celebrant.coordinates,
      rating: celebrant.rating,
      reviewCount: celebrant.reviewCount,
      website: celebrant.website,
      placeId: celebrant.placeId,
      placeLink: celebrant.placeLink,
      photos: celebrant.photos || [],
      reviews: [],
    };

    return {
      id: 200000 + index,
      name: celebrant.name,
      type: celebrant.type || 'Wedding Celebrant',
      city: celebrant.city,
      region: celebrant.country,
      country: celebrant.country,
      location: celebrant.fullAddress || celebrant.city,
      website: celebrant.website,
      image: celebrant.photos?.[0] || '',
      description: `${celebrant.type} in ${celebrant.city}`,
      fullDescription: celebrant.fullAddress || `${celebrant.type} based in ${celebrant.city}`,
      specialties: [],
      yearsExperience: 0,
      ceremoniesPerformed: 0,
      rating: celebrant.rating ?? 0,
      slug,
      livePlace,
      googleUrl: celebrant.placeLink,
      isLiveSearch: true,
    };
  });
};

export const fetchLiveDirectory = async (params: {
  type: string;
  country: 'UK' | 'Ireland' | 'All Countries';
  location?: string;
  pages?: number;
  pageSize?: number;
  useStaticData?: boolean;
  forceRefresh?: boolean;
}): Promise<EnrichedCelebrant[]> => {
  const { type, country, location, useStaticData = true, forceRefresh = false } = params;
  const pages = params.pages ?? 5;
  const pageSize = params.pageSize ?? 20;

  console.log('[fetchLiveDirectory] Input params:', {
    type,
    country,
    location,
    pages,
    pageSize,
    useStaticData,
    forceRefresh,
  });

  // Try static data first if enabled and not forcing refresh
  if (useStaticData && !forceRefresh) {
    try {
      const staticCelebrants = getCelebrantsFromStaticFile();

      if (staticCelebrants.length > 0) {
        console.log('[fetchLiveDirectory] Using static data file');

        // Filter static data by params
        const filtered = staticCelebrants.filter((celebrant) => {
          const matchesType = type === 'All Types' || celebrant.type === type;
          const matchesCountry =
            country === 'All Countries' ||
            celebrant.country === country ||
            (country === 'UK' && celebrant.country === 'UK') ||
            (country === 'Ireland' && celebrant.country === 'Ireland');
          const matchesLocation =
            !location ||
            location === 'All Locations' ||
            celebrant.city.toLowerCase() === location.toLowerCase() ||
            celebrant.location.toLowerCase().includes(location.toLowerCase());

          return matchesType && matchesCountry && matchesLocation;
        });

        console.log(`[fetchLiveDirectory] Filtered to ${filtered.length} celebrants from static data`);
        return filtered;
      }
    } catch (error) {
      console.error('[fetchLiveDirectory] Error loading static data, falling back to API:', error);
    }
  }

  // Fall back to live API if static data is empty or force refresh is enabled
  console.log('[fetchLiveDirectory] Fetching from live API');

  const queryParts = [type !== 'All Types' ? type : 'wedding celebrant', 'wedding celebrant'];
  if (location && location !== 'All Locations') queryParts.push(location);
  const query = queryParts.join(' ');

  console.log('[fetchLiveDirectory] Constructed query:', query);

  let targetCountry: 'UK' | 'Ireland' = country === 'Ireland' ? 'Ireland' : 'UK';
  let coords = countryCoords[targetCountry];

  if (location && location !== 'All Locations') {
    const key = location.toLowerCase();
    if (cityCoords[key]) {
      coords = { lat: cityCoords[key].lat, lng: cityCoords[key].lng };
      targetCountry = cityCoords[key].country;
    }
  }

  console.log('[fetchLiveDirectory] Using coordinates:', {
    lat: coords.lat,
    lng: coords.lng,
    targetCountry,
  });

  const results: EnrichedCelebrant[] = [];

  for (let i = 0; i < pages; i += 1) {
    const offset = i * pageSize;
    console.log(`[fetchLiveDirectory] Fetching page ${i + 1}/${pages}, offset: ${offset}`);

    const chunk = await searchMapsPlaces({
      query,
      country: targetCountry === 'UK' ? 'uk' : 'ie',
      lang: 'en',
      limit: pageSize,
      lat: coords.lat,
      lng: coords.lng,
      zoom: 11,
      offset,
    });

    console.log(`[fetchLiveDirectory] Page ${i + 1} returned ${chunk.length} results`);

    chunk.forEach((item, index) => {
      const slug = slugify(item.name + '-' + item.businessId + '-' + (offset + index));
      results.push({
        id: 100000 + offset + index,
        name: item.name,
        type: type,
        city: location || 'Live result',
        region: targetCountry,
        country: targetCountry,
        location: item.fullAddress || location || 'Live listing',
        website: item.website,
        image: item.photos?.[0] || '',
        description: 'Live listing via RapidAPI (tap to open maps).',
        fullDescription: item.fullAddress || 'Live listing',
        specialties: [],
        yearsExperience: 0,
        ceremoniesPerformed: 0,
        rating: item.rating ?? 0,
        slug,
        livePlace: item,
        googleUrl: item.placeLink,
        isLiveSearch: true,
      });
    });

    if (chunk.length < pageSize) {
      console.log(`[fetchLiveDirectory] Received fewer results than page size (${chunk.length} < ${pageSize}), stopping pagination`);
      break; // no more pages
    }
  }

  console.log('[fetchLiveDirectory] Total results before returning:', results.length);

  return results;
};
