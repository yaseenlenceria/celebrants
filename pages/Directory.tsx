import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Star, Sparkles, Quote, ArrowUpRight, Globe, ExternalLink, Database, RefreshCw, Map as MapIcon, List } from 'lucide-react';
import { EnrichedCelebrant, getCelebrants, fetchLiveDirectory, getCelebrantsFromStaticFile } from '../services/celebrantService';
import staticDataJson from '../data/celebrants-live.json';
import CelebrantMap from '../components/CelebrantMap';

const testimonials = [
  {
    name: 'Hannah & Lewis',
    location: 'Dublin City Hall',
    quote: 'The ceremony felt like us. Guests still talk about the bilingual blessing and the way Grace told our story.',
  },
  {
    name: 'Jade & Priya',
    location: 'Brighton Bandstand',
    quote: 'Sienna handled permits, tides, and even our Spotify cues. Zero stress, just joy.',
  },
  {
    name: 'Amir & Alex',
    location: 'Manchester Warehouse',
    quote: 'Noah wrote a script that sounded like our favourite album. Our families laughed and cried together.',
  },
];

const fallbackImage = 'https://via.placeholder.com/1200x900?text=Listing+image';

const liveCelebrations = [
  { city: 'London', couple: 'Isla & Jamie', moment: 'Rooftop confetti just went up!' },
  { city: 'Galway', couple: 'Aoife & Conor', moment: 'Handfasting wrapped at golden hour.' },
  { city: 'Cardiff', couple: 'Carys & Emyr', moment: 'Welsh hymn singalong that gave everyone chills.' },
];

const buildWebsiteUrl = (url?: string) => {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `https://${url}`;
};

const normalize = (value?: string) => (value || '').toLowerCase();

const relevanceScore = (celebrant: EnrichedCelebrant, query: string) => {
  if (!query.trim()) return 0;
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

  if (!tokens.length) return 0;

  const haystack = [
    celebrant.name,
    celebrant.city,
    celebrant.region,
    celebrant.country,
    celebrant.location,
    celebrant.type,
    celebrant.description,
    celebrant.fullDescription,
  ]
    .map(normalize)
    .join(' ');

  let score = 0;
  tokens.forEach((token) => {
    if (haystack.includes(token)) score += 3;
    if (celebrant.city.toLowerCase() === token) score += 2;
    if (celebrant.country.toLowerCase() === token) score += 1;
    if (celebrant.type.toLowerCase().includes(token)) score += 2;
  });

  return score;
};

const Directory: React.FC = () => {
  const [celebrantList, setCelebrantList] = useState<EnrichedCelebrant[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedCountry, setSelectedCountry] = useState<'All Countries' | 'UK' | 'Ireland'>('All Countries');
  const [popupIndex, setPopupIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [liveResults, setLiveResults] = useState<EnrichedCelebrant[]>([]);
  const [liveLoading, setLiveLoading] = useState(false);
  const [useStaticData, setUseStaticData] = useState(false);
  const [dataSource, setDataSource] = useState<string>('Static Database');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedCelebrant, setSelectedCelebrant] = useState<EnrichedCelebrant | null>(null);

  useEffect(() => {
    const ticker = setInterval(() => {
      setPopupIndex((prev) => (prev + 1) % liveCelebrations.length);
    }, 5200);
    return () => clearInterval(ticker);
  }, []);

  useEffect(() => {
    let active = true;
    getCelebrants()
      .then((data) => {
        if (!active) return;
        setCelebrantList(data);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    const loadLive = async () => {
      setLiveLoading(true);
      const cacheKey = `live:${selectedType}:${selectedCountry}:${selectedLocation}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached && !useStaticData) {
        try {
          const parsed = JSON.parse(cached);
          setLiveResults(parsed);
          setDataSource('Jina Search (Cached)');
        } catch (e) {
          // ignore parse errors
        }
      }

      try {
        const results = await fetchLiveDirectory({
          type: selectedType,
          country: selectedCountry,
          location: selectedLocation === 'All Locations' ? undefined : selectedLocation,
          pages: 5,
          pageSize: 20,
          useStaticData: useStaticData,
          forceRefresh: !useStaticData,
        });
        if (!active) return;
        setLiveResults(results);

        // Update data source indicator
        if (useStaticData && results.length > 0) {
          const staticData = staticDataJson as any;
          const lastUpdated = staticData.lastUpdated
            ? new Date(staticData.lastUpdated).toLocaleDateString()
            : 'Never';
          setDataSource(`Static Database (updated: ${lastUpdated})`);
        } else {
          setDataSource('Jina Search (Live)');
        }

        // Always cache the latest live pull so profile deep-links don't render blank pages
        localStorage.setItem(cacheKey, JSON.stringify(results));
      } catch (error) {
        if (!active) return;
        setDataSource('Error loading data');
        // keep cached results if any
      } finally {
        if (active) setLiveLoading(false);
      }
    };

    loadLive();
    return () => {
      active = false;
    };
  }, [selectedType, selectedCountry, selectedLocation, useStaticData]);

  const celebrantTypes = useMemo(
    () => ['All Types', ...Array.from(new Set(celebrantList.map((c) => c.type)))],
    [celebrantList]
  );

  const celebrantCountries = useMemo(
    () => ['All Countries', ...Array.from(new Set(celebrantList.map((c) => c.country)))],
    [celebrantList]
  );

  const celebrantLocations = useMemo(() => {
    if (selectedCountry === 'All Countries') {
      return ['All Locations', ...Array.from(new Set(celebrantList.map((c) => c.location)))];
    }
    return [
      'All Locations',
      ...Array.from(new Set(celebrantList.filter((c) => c.country === selectedCountry).map((c) => c.location))),
    ];
  }, [selectedCountry, celebrantList]);

  useEffect(() => {
    if (selectedLocation !== 'All Locations' && !celebrantLocations.includes(selectedLocation)) {
      setSelectedLocation('All Locations');
    }
  }, [selectedCountry, celebrantLocations, selectedLocation]);

  const filteredStatic = useMemo(() => {
    const query = searchQuery.trim();
    return celebrantList
      .map((celebrant) => {
        const matchesSearch =
          !query ||
          `${celebrant.name} ${celebrant.city} ${celebrant.region} ${celebrant.type}`
            .toLowerCase()
            .includes(query.toLowerCase());

        const matchesType = selectedType === 'All Types' || celebrant.type === selectedType;
        const matchesCountry = selectedCountry === 'All Countries' || celebrant.country === selectedCountry;
        const matchesLocation =
          selectedLocation === 'All Locations' ||
          celebrant.location === selectedLocation ||
          celebrant.city === selectedLocation;

        const passes = matchesSearch && matchesType && matchesCountry && matchesLocation;
        const score = passes ? relevanceScore(celebrant, query) : -1;
        return { celebrant, score };
      })
      .filter((item) => item.score >= 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        const ratingA = a.celebrant.livePlace?.rating ?? a.celebrant.rating;
        const ratingB = b.celebrant.livePlace?.rating ?? b.celebrant.rating;
        if (ratingB !== ratingA) return ratingB - ratingA;
        return b.celebrant.ceremoniesPerformed - a.celebrant.ceremoniesPerformed;
      })
      .map((item) => item.celebrant);
  }, [searchQuery, selectedType, selectedCountry, selectedLocation, celebrantList]);

  // Combine live results and filtered static results for map view
  const allResults = useMemo(() => {
    const combined = [...liveResults, ...filteredStatic];
    // Remove duplicates based on businessId or slug
    const unique = combined.filter((celebrant, index, self) =>
      index === self.findIndex((c) =>
        c.businessId === celebrant.businessId || c.slug === celebrant.slug
      )
    );
    return unique;
  }, [liveResults, filteredStatic]);

  // Filter results that have coordinates for map display
  const resultsWithCoordinates = useMemo(() => {
    return allResults.filter(celebrant =>
      (celebrant.livePlace?.coordinates || celebrant.coordinates) &&
      typeof (celebrant.livePlace?.coordinates || celebrant.coordinates)[0] === 'number'
    );
  }, [allResults]);

  const totalCount = celebrantList.length;

  return (
    <div className="bg-cream-100 text-charcoal-800 min-h-screen">
      <div className="relative overflow-hidden border-b border-sage-100 bg-gradient-to-br from-ink-900 via-ink-800 to-brand-900/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(159,185,255,0.16),transparent_36%),radial-gradient(circle_at_75%_8%,rgba(240,167,55,0.18),transparent_32%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-sage-100 bg-cream-200 px-4 py-2 text-xs uppercase tracking-[0.2em] text-charcoal-600">
                <Sparkles className="h-4 w-4 text-champagne-500" /> Verified celebrants in the UK & Ireland
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-charcoal-800 font-serif">
                Book the right celebrant, right where you are
              </h1>
              <p className="text-lg text-charcoal-600">
                We fetch live Google Maps listings via Jina Search Foundation and keep your curated profiles below for full details.
              </p>
            </div>
            <div className="w-full max-w-lg">
              <div className="rounded-3xl bg-white/95 backdrop-blur-lg border border-white/30 shadow-2xl p-6 space-y-4">
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-champagne/30 flex items-center justify-center text-champagne-800 font-semibold">1</div>
                    <div>
                      <p className="font-semibold text-charcoal-800">Set your location</p>
                      <p className="text-charcoal-600">Live listings are pulled near your filters.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-champagne/30 flex items-center justify-center text-champagne-800 font-semibold">2</div>
                    <div>
                      <p className="font-semibold text-charcoal-800">Pick ceremony style</p>
                      <p className="text-charcoal-600">Luxury, story-driven, interfaith, bilingual, elopements.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-champagne/30 flex items-center justify-center text-champagne-800 font-semibold">3</div>
                    <div>
                      <p className="font-semibold text-charcoal-800">Open listing</p>
                      <p className="text-charcoal-600">Live cards open Google Maps; curated cards open profiles.</p>
                    </div>
                  </div>
                </div>
                {liveLoading && <p className="text-xs text-charcoal-600">Fetching live listings...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold text-charcoal-800 font-serif">
                {viewMode === 'map' ? 'Interactive Map View' : 'Directory Listings'}
              </h2>
              <div className="flex bg-white rounded-2xl border border-sage-200 p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    viewMode === 'list'
                      ? 'bg-champagne text-white'
                      : 'text-charcoal-600 hover:text-charcoal-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <List className="h-4 w-4" />
                    List View
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-champagne text-white'
                      : 'text-charcoal-600 hover:text-charcoal-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MapIcon className="h-4 w-4" />
                    Map View
                  </div>
                </button>
              </div>
            </div>
            <p className="text-charcoal-600">
              {viewMode === 'map'
                ? `Showing ${resultsWithCoordinates.length} celebrants with location data on the map.`
                : `Up to ~100 results per query. Showing ${liveResults.length} live listings.`
              }
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-champagne-600" />
              <span className="text-sm text-charcoal-600">
                <strong>Data source:</strong> {dataSource}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 bg-white rounded-2xl border border-sage-200 px-4 py-3 shadow-sm cursor-pointer hover:border-champagne transition-colors">
              <input
                type="checkbox"
                checked={!useStaticData}
                onChange={(e) => setUseStaticData(!e.target.checked)}
                className="w-5 h-5 text-champagne-600 rounded focus:ring-champagne-500"
              />
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-charcoal-600" />
                <span className="text-sm font-medium text-charcoal-700">Use Jina live search</span>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-charcoal-500" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, city, or style"
                className="w-full rounded-2xl border border-sage-100 bg-white px-10 py-3 text-sm shadow-sm focus:border-champagne focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full rounded-2xl border border-sage-100 bg-white px-4 py-3 text-sm shadow-sm focus:border-champagne"
              >
                {celebrantTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as any)}
                className="w-full rounded-2xl border border-sage-100 bg-white px-4 py-3 text-sm shadow-sm focus:border-champagne"
              >
                {celebrantCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-2xl border border-sage-100 bg-white px-4 py-3 text-sm shadow-sm focus:border-champagne"
              >
                {celebrantLocations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' ? (
          <div className="space-y-6">
            <CelebrantMap
              celebrants={resultsWithCoordinates}
              selectedCelebrant={selectedCelebrant}
              onCelebrantSelect={setSelectedCelebrant}
              className="w-full"
            />

            {/* Selected Celebrant Detail Card */}
            {selectedCelebrant && (
              <div className="glass-surface rounded-3xl p-6 border border-sage-200 shadow-xl">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/3">
                    {(selectedCelebrant.livePlace?.photos?.[0] || selectedCelebrant.image) && (
                      <img
                        src={selectedCelebrant.livePlace?.photos?.[0] || selectedCelebrant.image}
                        alt={selectedCelebrant.livePlace?.name || selectedCelebrant.name}
                        className="w-full h-48 lg:h-full object-cover rounded-2xl"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                      />
                    )}
                  </div>
                  <div className="lg:w-2/3 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal-800">
                        {selectedCelebrant.livePlace?.name || selectedCelebrant.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-champagne/20 text-champagne-dark border border-champagne/30">
                          {selectedCelebrant.type}
                        </span>
                        <span className="text-sm text-charcoal-600">• {selectedCelebrant.country}</span>
                      </div>
                    </div>

                    {selectedCelebrant.livePlace?.rating && (
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-champagne text-champagne" />
                        <span className="font-semibold text-charcoal-800">
                          {selectedCelebrant.livePlace.rating.toFixed(1)}
                        </span>
                        {selectedCelebrant.livePlace.reviewCount && (
                          <span className="text-sm text-charcoal-600">
                            ({selectedCelebrant.livePlace.reviewCount} reviews)
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-start gap-2 text-sm text-charcoal-600">
                      <MapPin className="h-4 w-4 text-champagne mt-0.5 flex-shrink-0" />
                      <span>{selectedCelebrant.livePlace?.fullAddress || selectedCelebrant.location}</span>
                    </div>

                    {selectedCelebrant.description && (
                      <p className="text-sm text-charcoal-600 leading-relaxed">
                        {selectedCelebrant.description}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-sage-100">
                      <Link
                        to={`/celebrants/${selectedCelebrant.slug}`}
                        state={{ celebrant: selectedCelebrant }}
                        className="inline-flex items-center gap-2 bg-champagne text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-champagne-dark transition-colors"
                      >
                        View Full Profile
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                      {selectedCelebrant.livePlace?.placeLink && (
                        <a
                          href={selectedCelebrant.livePlace.placeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-sage-200 text-charcoal-800 px-6 py-2 rounded-full text-sm font-semibold hover:bg-sage-300 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Google Maps
                        </a>
                      )}
                      {selectedCelebrant.livePlace?.website && (
                        <a
                          href={selectedCelebrant.livePlace.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-sage-200 text-charcoal-800 px-6 py-2 rounded-full text-sm font-semibold hover:bg-cream-100 transition-colors"
                        >
                          <Globe className="h-4 w-4" />
                          Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Map Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-sage-200 p-4 text-center">
                <p className="text-2xl font-bold text-charcoal-800">{resultsWithCoordinates.length}</p>
                <p className="text-sm text-charcoal-600">On Map</p>
              </div>
              <div className="bg-white rounded-2xl border border-sage-200 p-4 text-center">
                <p className="text-2xl font-bold text-charcoal-800">{allResults.length}</p>
                <p className="text-sm text-charcoal-600">Total Results</p>
              </div>
              <div className="bg-white rounded-2xl border border-sage-200 p-4 text-center">
                <p className="text-2xl font-bold text-charcoal-800">{selectedCountry === 'All Countries' ? 'UK & Ireland' : selectedCountry}</p>
                <p className="text-sm text-charcoal-600">Coverage</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* List View - Live Results */}
            {liveResults.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {liveResults.map((celebrant, idx) => {
              const displayName = celebrant.livePlace?.name || celebrant.name;
              const displayLocation = celebrant.livePlace?.fullAddress || celebrant.location;
              const rating = celebrant.livePlace?.rating ?? celebrant.rating;
              const image = celebrant.livePlace?.photos?.[0] || celebrant.image || fallbackImage;

              return (
                <Link
                  key={`live-${celebrant.slug}-${idx}`}
                  to={`/celebrants/${celebrant.slug}`}
                  state={{ celebrant }}
                  onClick={() => { try { sessionStorage.setItem('selectedCelebrant', JSON.stringify(celebrant)); } catch (_) {} }}
                  className="group celebrant-card bg-white border border-sage-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  <div className="h-80 w-full overflow-hidden relative">
                    <img
                      src={image}
                      alt={displayName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 image-crisp"
                      loading="lazy"
                      width="1200"
                      height="900"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-sm font-bold text-champagne-600 shadow-lg">
                      <Star className="h-5 w-5 fill-champagne-400 text-champagne-400" /> {rating ? rating.toFixed(1) : 'N/A'}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-500 to-champagne-600 text-white px-4 py-2 text-xs uppercase tracking-[0.14em] font-semibold shadow-lg">
                        {celebrant.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal-800 font-serif group-hover:text-champagne-600 transition-colors">{displayName}</h3>
                      <span className="text-xs uppercase tracking-[0.16em] text-charcoal-500 font-semibold">{celebrant.country}</span>
                    </div>
                    <div className="flex items-start text-sm text-charcoal-600 gap-2">
                      <MapPin className="h-5 w-5 text-champagne-500 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{displayLocation}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-sage-100">
                      <span className="text-xs text-charcoal-600 font-medium">{celebrant.ceremoniesPerformed}+ ceremonies</span>
                      {celebrant.livePlace?.placeLink && (
                        <a
                          href={celebrant.livePlace.placeLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-champagne-600 hover:text-champagne-700 font-semibold"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Google Maps <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-charcoal-500">No live listings found for this filter.</p>
        )}

        <div className="border-t border-sage-100 pt-10">
          <h2 className="text-2xl font-bold text-charcoal-800 font-serif mb-4">Curated profiles (full details)</h2>
          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="celebrant-card animate-pulse rounded-2xl bg-cream-200 h-80" />
              ))}
            </div>
          ) : filteredStatic.length === 0 ? (
            <div className="text-center py-16 bg-cream-200 rounded-3xl border border-sage-100">
              <h3 className="text-xl font-semibold text-charcoal-800 mb-2">No celebrants found</h3>
              <p className="text-charcoal-600 mb-4">Try changing the country or removing a filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All Types');
                  setSelectedLocation('All Locations');
                  setSelectedCountry('All Countries');
                }}
                className="bg-champagne text-ink-900 px-6 py-2 rounded-full font-semibold hover:bg-champagne-dark"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredStatic.map((celebrant) => {
                const displayName = celebrant.livePlace?.name || celebrant.name;
                const displayLocation = celebrant.livePlace?.fullAddress || celebrant.location;
                const displayWebsite = buildWebsiteUrl(celebrant.livePlace?.website || celebrant.website);
                const rating = celebrant.livePlace?.rating ?? celebrant.rating;
                const image = celebrant.livePlace?.photos?.[0] || celebrant.image || fallbackImage;

                return (
                  <Link
                    key={celebrant.slug}
                    to={`/celebrants/${celebrant.slug}`}
                    state={{ celebrant }}
                    onClick={() => { try { sessionStorage.setItem('selectedCelebrant', JSON.stringify(celebrant)); } catch (_) {} }}
                    className="group celebrant-card bg-white border border-sage-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-80 w-full overflow-hidden relative">
                      <img
                        src={image}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 image-crisp"
                        loading="lazy"
                        width="1200"
                        height="900"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackImage;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/20 to-transparent" />
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-sm font-bold text-champagne-600 shadow-lg">
                        <Star className="h-5 w-5 fill-champagne-400 text-champagne-400" /> {rating ? rating.toFixed(1) : '�'}
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-champagne-500 to-champagne-600 text-white px-4 py-2 text-xs uppercase tracking-[0.14em] font-semibold shadow-lg">
                          {celebrant.type}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-charcoal-800 font-serif group-hover:text-champagne-600 transition-colors">{displayName}</h3>
                        <span className="text-xs uppercase tracking-[0.16em] text-charcoal-500 font-semibold">{celebrant.country}</span>
                      </div>
                      <div className="flex items-start text-sm text-charcoal-600 gap-2">
                        <MapPin className="h-5 w-5 text-champagne-500 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{displayLocation}</span>
                      </div>
                      <p className="text-sm text-charcoal-600 leading-relaxed line-clamp-4">{celebrant.description}</p>                    <div className="flex items-center justify-between pt-2 border-t border-sage-100">
                        <span className="text-xs text-charcoal-600 font-medium">{celebrant.ceremoniesPerformed}+ ceremonies</span>
                        {displayWebsite && (
                          <a
                            href={displayWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-champagne-600 hover:text-champagne-700 font-semibold"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Globe className="h-4 w-4" /> Website
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        </>
        )}

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="glass-surface rounded-2xl border border-sage-100 p-6 space-y-3">
              <Quote className="h-8 w-8 text-champagne-600" />
              <p className="text-charcoal-800 leading-relaxed">"{item.quote}"</p>
              <div>
                <p className="text-charcoal-800 font-semibold">{item.name}</p>
                <p className="text-charcoal-700 text-sm">{item.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-cream-200 border border-sage-100 rounded-3xl p-10 text-center">
          <h2 className="text-2xl font-bold text-charcoal-800 font-serif mb-2">Are you a celebrant?</h2>
          <p className="text-charcoal-600 mb-6">Apply to list in the directory and add verified reviews to your profile.</p>
          <button className="bg-champagne text-ink-900 px-6 py-3 rounded-full font-semibold hover:bg-champagne-dark">Join the directory</button>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-40">
        <div className="rounded-2xl bg-white/95 text-ink-900 shadow-2xl border border-ink-100 px-4 py-3 w-72 animate-slideUp">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full bg-champagne/20 p-2 text-champagne-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-ink-800">{liveCelebrations[popupIndex].couple}</p>
              <p className="text-ink-700">{liveCelebrations[popupIndex].moment}</p>
              <p className="text-xs text-charcoal-8000 mt-1">{liveCelebrations[popupIndex].city}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;

























