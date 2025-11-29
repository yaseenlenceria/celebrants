export interface LivePlaceReview {
  author: string;
  text: string;
  rating: number;
  relativeTime?: string;
  link?: string;
}

export interface LivePlaceData {
  businessId: string;
  name: string;
  fullAddress?: string;
  coordinates?: { lat: number; lng: number };
  rating?: number;
  reviewCount?: number;
  website?: string;
  placeId?: string;
  placeLink?: string;
  photos: string[];
  reviews: LivePlaceReview[];
}

const API_HOST = 'maps-data.p.rapidapi.com';
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY || process.env.VITE_RAPIDAPI_KEY;

interface FetchPlaceOptions {
  businessId: string;
  placeId?: string;
  country?: string;
  lang?: string;
  limit?: number;
  sort?: 'Relevant' | 'Newest' | 'HighestRating' | 'LowestRating';
}

interface RawMapsPhoto {
  url?: string;
  src?: string;
  description?: string | null;
}

interface RawMapsReview {
  user_name?: string;
  review_text?: string;
  review_rate?: number;
  review_time?: string;
  review_link?: string;
}

interface RawMapsResponse {
  data?: {
    business_id?: string;
    name?: string;
    full_address?: string;
    latitude?: number;
    longitude?: number;
    review_count?: number;
    rating?: number;
    website?: string | null;
    website_full?: string | null;
    place_id?: string;
    place_link?: string;
    photos?: RawMapsPhoto[];
    reviews?: RawMapsReview[];
  };
}

interface RawSearchMapsItem {
  business_id?: string;
  name?: string;
  full_address?: string;
  rating?: number;
  place_id?: string;
  place_link?: string;
  photos?: RawMapsPhoto[];
  website?: string | null;
}

const missingKeyError = 'Missing VITE_RAPIDAPI_KEY in your environment (.env.local)';

const mapReviews = (reviews?: RawMapsReview[]): LivePlaceReview[] => {
  if (!reviews) return [];
  return reviews
    .map((review) => ({
      author: review.user_name?.trim() || 'Recent visitor',
      rating: review.review_rate ?? 0,
      text: review.review_text?.trim() || 'No review text available.',
      relativeTime: review.review_time ?? 'Recently',
      link: review.review_link,
    }))
    .filter((review) => Boolean(review.text));
};

const dedupePhotos = (photos: string[]) => Array.from(new Set(photos.filter(Boolean)));

const fetchJson = async (url: URL) => {
  if (!API_KEY) {
    throw new Error(missingKeyError);
  }

  // Log request details
  const maskedKey = API_KEY.length > 8
    ? `${API_KEY.slice(0, 4)}...${API_KEY.slice(-4)}`
    : '****';
  console.log('[RapidAPI fetchJson] Request URL:', url.toString());
  console.log('[RapidAPI fetchJson] API Key (masked):', maskedKey);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'x-rapidapi-host': API_HOST,
      'x-rapidapi-key': API_KEY,
    },
  });

  // Log response status
  console.log('[RapidAPI fetchJson] Response status:', response.status);
  console.log('[RapidAPI fetchJson] Response ok:', response.ok);

  if (!response.ok) {
    throw new Error(`RapidAPI request failed (${response.status})`);
  }

  const data = await response.json();

  // Log if data is present
  console.log('[RapidAPI fetchJson] Data present:', !!data);
  console.log('[RapidAPI fetchJson] Data structure:', JSON.stringify(data, null, 2));

  return data;
};

const fetchPlacePhotos = async (options: FetchPlaceOptions): Promise<string[]> => {
  const url = new URL('https://maps-data.p.rapidapi.com/photos.php');
  url.searchParams.set('business_id', options.businessId);
  if (options.placeId) url.searchParams.set('place_id', options.placeId);
  url.searchParams.set('country', options.country || 'us');
  url.searchParams.set('lang', options.lang || 'en');

  const raw: any = await fetchJson(url);
  const payload = raw?.data;

  if (!payload) return [];

  if (Array.isArray(payload)) {
    return dedupePhotos(payload.map((item: RawMapsPhoto) => item?.url || item?.src || ''));
  }

  if (Array.isArray(payload.photos)) {
    return dedupePhotos(payload.photos.map((item: RawMapsPhoto) => item?.url || item?.src || ''));
  }

  return [];
};

export const fetchPlaceSnapshot = async (
  options: FetchPlaceOptions,
  { includePhotos = true }: { includePhotos?: boolean } = {}
): Promise<LivePlaceData> => {
  if (!API_KEY) {
    throw new Error(missingKeyError);
  }

  const url = new URL('https://maps-data.p.rapidapi.com/reviews.php');
  url.searchParams.set('business_id', options.businessId);
  if (options.placeId) url.searchParams.set('place_id', options.placeId);
  url.searchParams.set('country', options.country || 'us');
  url.searchParams.set('lang', options.lang || 'en');
  url.searchParams.set('limit', String(options.limit ?? 6));
  url.searchParams.set('sort', options.sort || 'Relevant');

  console.log('[RapidAPI fetchPlaceSnapshot] Request URL:', url.toString());

  const raw: RawMapsResponse = await fetchJson(url);
  const payload = raw.data;

  console.log('[RapidAPI fetchPlaceSnapshot] Payload present:', !!payload);
  if (payload) {
    console.log('[RapidAPI fetchPlaceSnapshot] Place name:', payload.name);
    console.log('[RapidAPI fetchPlaceSnapshot] Place rating:', payload.rating);
    console.log('[RapidAPI fetchPlaceSnapshot] Photos count:', payload.photos?.length || 0);
  }

  if (!payload) {
    throw new Error('RapidAPI response missing data');
  }

  let photos = (payload.photos || [])
    .map((photo) => photo.url || photo.src)
    .filter((url): url is string => Boolean(url));

  if (includePhotos) {
    const extraPhotos = await fetchPlacePhotos(options).catch(() => []);
    photos = dedupePhotos([...photos, ...extraPhotos]);
  }

  return {
    businessId: payload.business_id ?? options.businessId,
    name: payload.name || 'Unknown place',
    fullAddress: payload.full_address,
    coordinates: payload.latitude && payload.longitude ? { lat: payload.latitude, lng: payload.longitude } : undefined,
    rating: payload.rating,
    reviewCount: payload.review_count,
    website: payload.website_full || payload.website || undefined,
    placeId: payload.place_id || options.placeId,
    placeLink: payload.place_link,
    photos,
    reviews: mapReviews(payload.reviews),
  };
};

export const searchMapsPlaces = async (params: {
  query: string;
  country?: string;
  lang?: string;
  limit?: number;
  lat?: number;
  lng?: number;
  offset?: number;
  zoom?: number;
}): Promise<LivePlaceData[]> => {
  if (!API_KEY) {
    throw new Error(missingKeyError);
  }

  const url = new URL('https://maps-data.p.rapidapi.com/searchmaps.php');
  url.searchParams.set('query', params.query);
  url.searchParams.set('limit', String(params.limit ?? 20));
  url.searchParams.set('country', params.country || 'us');
  url.searchParams.set('lang', params.lang || 'en');
  if (params.lat !== undefined) url.searchParams.set('lat', String(params.lat));
  if (params.lng !== undefined) url.searchParams.set('lng', String(params.lng));
  if (params.offset !== undefined) url.searchParams.set('offset', String(params.offset));
  if (params.zoom !== undefined) url.searchParams.set('zoom', String(params.zoom));

  console.log('[RapidAPI searchMapsPlaces] Constructed URL with params:', url.toString());
  console.log('[RapidAPI searchMapsPlaces] Query params:', {
    query: params.query,
    limit: params.limit ?? 20,
    country: params.country || 'us',
    lang: params.lang || 'en',
    lat: params.lat,
    lng: params.lng,
    offset: params.offset,
    zoom: params.zoom,
  });

  const raw: { data?: RawSearchMapsItem[] } = await fetchJson(url);
  const items = raw.data || [];

  console.log('[RapidAPI searchMapsPlaces] Raw response structure:', {
    hasData: !!raw.data,
    dataIsArray: Array.isArray(raw.data),
    rawDataLength: items.length,
  });
  console.log('[RapidAPI searchMapsPlaces] Items in raw.data array:', items.length);

  const mapped = items.map((item) => {
    const photos = (item.photos || []).map((p) => p.url || p.src || '').filter(Boolean);
    return {
      businessId: item.business_id || 'unknown',
      name: item.name || 'Unknown place',
      fullAddress: item.full_address,
      rating: item.rating,
      photos,
      placeId: item.place_id,
      placeLink: item.place_link,
      reviews: [],
      website: item.website || undefined,
    } as LivePlaceData;
  });

  const filtered = mapped.filter((item) => {
    const passes = !!item.businessId && item.businessId !== 'unknown';
    if (!passes) {
      console.log('[RapidAPI searchMapsPlaces] Filtered out item:', {
        name: item.name,
        businessId: item.businessId,
        reason: !item.businessId ? 'no businessId' : 'businessId is unknown',
      });
    }
    return passes;
  });

  console.log('[RapidAPI searchMapsPlaces] Items after filtering:', filtered.length);
  console.log('[RapidAPI searchMapsPlaces] Sample filtered results:', filtered.slice(0, 3).map(r => ({
    name: r.name,
    businessId: r.businessId,
    rating: r.rating,
  })));

  return filtered;
};
