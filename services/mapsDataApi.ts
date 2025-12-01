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

const JINA_BASE_URL = import.meta.env.VITE_JINA_BASE_URL || process.env.VITE_JINA_BASE_URL || 'https://deepsearch.jina.ai/v1/chat/completions';
const JINA_API_KEY = import.meta.env.VITE_JINA_API_KEY || process.env.VITE_JINA_API_KEY;
const JINA_SEARCH_MODEL =
  import.meta.env.VITE_JINA_SEARCH_MODEL || process.env.VITE_JINA_SEARCH_MODEL || 'jina-deepsearch-v1';

const missingKeyError = 'Missing VITE_JINA_API_KEY in your environment (.env.local)';

type UnknownRecord = Record<string, unknown>;

const normalizePhotos = (input: unknown): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return Array.from(new Set(input.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)));
  }
  if (typeof input === 'string') {
    return [input];
  }
  if (typeof input === 'object' && input !== null) {
    const maybePhoto = (input as UnknownRecord).url || (input as UnknownRecord).src;
    if (typeof maybePhoto === 'string') return [maybePhoto];
  }
  return [];
};

const coerceNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
};

const parseJsonContent = (content: string): UnknownRecord => {
  const trimmed = content.trim();
  const codeBlockMatch = trimmed.match(/```(?:json)?\n([\s\S]*?)```/i);
  const candidate = codeBlockMatch ? codeBlockMatch[1] : trimmed;

  try {
    return JSON.parse(candidate);
  } catch (error) {
    console.warn('[Jina parseJsonContent] Failed to parse JSON, returning empty object', error);
    return {};
  }
};

const pickPlacesArray = (payload: UnknownRecord): UnknownRecord[] => {
  if (!payload) return [];
  if (Array.isArray((payload as any).places)) return (payload as any).places as UnknownRecord[];
  if (Array.isArray((payload as any).results)) return (payload as any).results as UnknownRecord[];
  if (Array.isArray((payload as any).data)) return (payload as any).data as UnknownRecord[];
  return [];
};

const mapPlace = (place: UnknownRecord, fallbackId: string): LivePlaceData => {
  const businessId =
    (place.businessId as string) ||
    (place.business_id as string) ||
    (place.placeId as string) ||
    (place.place_id as string) ||
    (place.google_id as string) ||
    (place.maps_id as string) ||
    (place.placeLink as string) ||
    (place.maps_url as string) ||
    fallbackId;

  const lat = coerceNumber((place.coordinates as any)?.lat) ?? coerceNumber((place as any).lat);
  const lng = coerceNumber((place.coordinates as any)?.lng) ?? coerceNumber((place as any).lng);

  const rating = coerceNumber(place.rating);
  const reviewCount = coerceNumber((place as any).reviewCount ?? (place as any).reviews_count);

  const placeLink =
    (place.placeLink as string) ||
    (place.maps_url as string) ||
    (place.google_maps_url as string) ||
    (place.url as string) ||
    (place.map_url as string);

  return {
    businessId,
    name: (place.name as string) || 'Unknown place',
    fullAddress:
      (place.fullAddress as string) ||
      (place.address as string) ||
      (place.formatted_address as string) ||
      (place.location as string),
    coordinates: lat !== undefined && lng !== undefined ? { lat, lng } : undefined,
    rating,
    reviewCount,
    website: (place.website as string) || (place.site as string) || undefined,
    placeId: (place.placeId as string) || (place.place_id as string),
    placeLink,
    photos: normalizePhotos((place as any).photos || (place as any).photo || (place as any).image),
    reviews: [],
  };
};

const buildUserPrompt = (params: {
  query: string;
  country?: string;
  lat?: number;
  lng?: number;
  limit: number;
}): string => {
  const locationHints = [] as string[];
  if (params.country) locationHints.push(`country: ${params.country}`);
  if (params.lat !== undefined && params.lng !== undefined)
    locationHints.push(`coordinates: (${params.lat}, ${params.lng})`);

  const celebrantTypes = [
    'wedding celebrant', 'marriage celebrant', 'civil celebrant',
    'independent celebrant', 'humanist celebrant', 'interfaith celebrant',
    'civil ceremony officiant', 'marriage officiant', 'wedding officiant',
    'celebrancy services', 'ceremony celebrant', 'vow renewal celebrant'
  ];

  // Enhance the query with related celebrant terms
  let enhancedQuery = params.query;
  if (!celebrantTypes.some(type => params.query.toLowerCase().includes(type))) {
    enhancedQuery = `${params.query} ${celebrantTypes.slice(0, 3).join(' OR ')}`;
  }

  return [
    `Search Google Maps for real businesses that match: "${enhancedQuery}".`,
    `Look for actual wedding celebrants, marriage officiants, civil ceremony providers, and related professional services.`,
    locationHints.length ? `Geographically bias results to ${locationHints.join(' | ')}.` : '',
    `Find up to ${params.limit} verified businesses with real physical locations or service areas.`,
    '',
    'Return ONLY valid JSON with this exact structure:',
    '{"places": [{"businessId":"string","name":"string","fullAddress":"string","rating":number,"website":"string","placeLink":"https url","photos":["https url"],"reviewCount":number}]}',
    '',
    'Requirements:',
    '- businessId: unique identifier (Google Place ID, business ID, or similar)',
    '- name: actual business name as shown on Google Maps',
    '- fullAddress: complete service address or coverage area',
    '- rating: average Google rating (number, not string)',
    '- website: official business website if available',
    '- placeLink: direct Google Maps URL for the business',
    '- photos: array of business photos from Google Maps',
    '- reviewCount: total number of Google reviews',
    '',
    'Focus on real, operating businesses. Avoid duplicate entries.',
    'Use exact Google Maps share URLs for placeLink.',
    'Only include results that are actually wedding/ceremony related businesses.',
  ]
    .filter(Boolean)
    .join('\n');
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
  if (!JINA_API_KEY) {
    throw new Error(missingKeyError);
  }

  const limit = params.limit && params.limit > 0 ? params.limit : 20;
  const userPrompt = buildUserPrompt({ query: params.query, country: params.country, lat: params.lat, lng: params.lng, limit });

  const body = {
    model: JINA_SEARCH_MODEL,
    messages: [
      {
        role: 'system',
        content:
          'You are a data agent that fetches Google Maps business details and returns only the requested JSON. Do not include markdown, comments, or explanations.',
      },
      { role: 'user', content: userPrompt },
    ],
    stream: false,
    temperature: 0,
    reasoning_effort: 'medium',
    response_format: { type: 'json_object' },
  };

  const res = await fetch(JINA_BASE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${JINA_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => '');
    throw new Error(`Jina request failed (${res.status}): ${errorText.slice(0, 400)}`);
  }

  const data = (await res.json()) as UnknownRecord;
  const content = (data as any)?.choices?.[0]?.message?.content as string;

  if (!content) {
    console.warn('[Jina searchMapsPlaces] Empty response content from API');
    return [];
  }

  const parsed = parseJsonContent(content);
  const places = pickPlacesArray(parsed);

  return places
    .map((place, index) => mapPlace(place, `${params.query}-${index}`))
    .filter((item) => Boolean(item.businessId));
};
