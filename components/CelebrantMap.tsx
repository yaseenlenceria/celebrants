import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import { EnrichedCelebrant } from '../services/celebrantService';
import { MapPin, Star, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CelebrantMapProps {
  celebrants: EnrichedCelebrant[];
  selectedCelebrant?: EnrichedCelebrant | null;
  onCelebrantSelect?: (celebrant: EnrichedCelebrant) => void;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

// Custom marker icon for celebrants
const createCelebrantIcon = (rating?: number) => {
  const color = rating && rating >= 4.5 ? '#10b981' : rating && rating >= 4.0 ? '#f59e0b' : '#ef4444';
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.164 0 0 7.164 0 16C0 24 16 40 16 40S32 24 32 16C32 7.164 24.836 0 16 0Z" fill="${color}"/>
        <circle cx="16" cy="14" r="8" fill="white"/>
        <text x="16" y="18" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="10" font-weight="bold">⭐</text>
      </svg>
    `)}`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
};

// Map bounds updater component
const MapBoundsUpdater: React.FC<{ celebrants: EnrichedCelebrant[] }> = ({ celebrants }) => {
  const map = useMap();

  useEffect(() => {
    if (celebrants.length > 0) {
      const validCoordinates = celebrants
        .filter(c => c.livePlace?.coordinates || c.coordinates)
        .map(c => c.livePlace?.coordinates || c.coordinates)
        .filter(Boolean) as [number, number][];

      if (validCoordinates.length > 0) {
        const bounds = new LatLngBounds(validCoordinates);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }
  }, [celebrants, map]);

  return null;
};

// Map events handler
const MapEventsHandler: React.FC<{
  onCelebrantSelect?: (celebrant: EnrichedCelebrant) => void;
}> = ({ onCelebrantSelect }) => {
  useMapEvents({
    click: (e) => {
      // Deselect celebrant when clicking on empty map area
      onCelebrantSelect?.(null as any);
    },
  });
  return null;
};

const CelebrantMap: React.FC<CelebrantMapProps> = ({
  celebrants,
  selectedCelebrant,
  onCelebrantSelect,
  center = [53.4808, -2.2426], // Default to Manchester, UK
  zoom = 6,
  className = ''
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  const [mapZoom, setMapZoom] = useState(zoom);
  const mapRef = useRef<any>(null);

  // Filter celebrants with valid coordinates
  const celebrantsWithCoordinates = celebrants.filter(
    c => (c.livePlace?.coordinates || c.coordinates) &&
         typeof (c.livePlace?.coordinates || c.coordinates)[0] === 'number'
  );

  // Update map center when selected celebrant changes
  useEffect(() => {
    if (selectedCelebrant && (selectedCelebrant.livePlace?.coordinates || selectedCelebrant.coordinates)) {
      const coords = selectedCelebrant.livePlace?.coordinates || selectedCelebrant.coordinates;
      setMapCenter([coords[0], coords[1]]);
      setMapZoom(12);
    }
  }, [selectedCelebrant]);

  if (celebrantsWithCoordinates.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-sage-100 rounded-3xl border-2 border-dashed border-sage-300 ${className}`}>
        <div className="text-center p-8">
          <MapPin className="h-12 w-12 text-sage-400 mx-auto mb-4" />
          <p className="text-charcoal-600 font-medium">No location data available</p>
          <p className="text-sm text-charcoal-500 mt-1">Try adjusting your search filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-3xl overflow-hidden shadow-2xl border border-sage-200 ${className}`}>
      <div className="bg-gradient-to-r from-champagne to-sage-200 px-4 py-3 border-b border-sage-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-charcoal-800" />
            <span className="text-sm font-semibold text-charcoal-800">
              {celebrantsWithCoordinates.length} celebrants on map
            </span>
          </div>
          <button
            onClick={() => {
              if (mapRef.current) {
                const map = mapRef.current;
                if (celebrantsWithCoordinates.length > 0) {
                  const validCoordinates = celebrantsWithCoordinates
                    .map(c => c.livePlace?.coordinates || c.coordinates)
                    .filter(Boolean) as [number, number][];
                  const bounds = new LatLngBounds(validCoordinates);
                  map.fitBounds(bounds, { padding: [50, 50] });
                }
              }
            }}
            className="text-xs text-champagne-dark hover:text-champagne font-medium"
          >
            Fit all markers
          </button>
        </div>
      </div>

      <MapContainer
        ref={mapRef}
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '500px', width: '100%' }}
        className="z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapBoundsUpdater celebrants={celebrantsWithCoordinates} />
        <MapEventsHandler onCelebrantSelect={onCelebrantSelect} />

        {celebrantsWithCoordinates.map((celebrant) => {
          const coords = celebrant.livePlace?.coordinates || celebrant.coordinates;
          const displayName = celebrant.livePlace?.name || celebrant.name;
          const rating = celebrant.livePlace?.rating ?? celebrant.rating;
          const photo = celebrant.livePlace?.photos?.[0] || celebrant.image;

          return (
            <Marker
              key={`${celebrant.slug}-${celebrant.businessId}`}
              position={[coords[0], coords[1]]}
              icon={createCelebrantIcon(rating)}
              eventHandlers={{
                click: () => {
                  onCelebrantSelect?.(celebrant);
                },
              }}
            >
              <Popup
                maxWidth={300}
                className="celebrant-popup"
              >
                <div className="p-2">
                  {photo && (
                    <img
                      src={photo}
                      alt={displayName}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-bold text-charcoal-800 text-lg">{displayName}</h3>
                      <p className="text-xs text-charcoal-600 uppercase tracking-wide">{celebrant.type}</p>
                    </div>

                    {rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-champagne text-champagne" />
                        <span className="text-sm font-medium text-charcoal-700">{rating.toFixed(1)}</span>
                      </div>
                    )}

                    <div className="text-sm text-charcoal-600">
                      <div className="flex items-start gap-1">
                        <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0 text-champagne" />
                        <span>{celebrant.livePlace?.fullAddress || celebrant.location}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link
                        to={`/celebrants/${celebrant.slug}`}
                        state={{ celebrant }}
                        className="flex-1 bg-champagne text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-champagne-dark transition-colors text-center"
                      >
                        View Profile
                      </Link>
                      {celebrant.livePlace?.placeLink && (
                        <a
                          href={celebrant.livePlace.placeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 bg-sage-200 text-charcoal-800 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-sage-300 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Maps
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default CelebrantMap;