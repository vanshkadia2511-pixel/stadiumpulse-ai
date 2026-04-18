import React, { useContext } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { StadiumContext } from '../../context/StadiumState';

export default function VenueMap() {
  const { zones } = useContext(StadiumContext);
  const MAPS_API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  if (!MAPS_API_KEY) {
    return (
      <div className="h-[600px] bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 shadow-2xl">
        <div className="text-center p-6">
          <svg className="w-12 h-12 text-slate-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-bold text-slate-200 mb-2">Google Maps API Key Missing</h3>
          <p className="text-slate-400 text-sm max-w-sm">Please add your VITE_MAPS_API_KEY to the .env file to enable the live venue map visualization.</p>
        </div>
      </div>
    );
  }

  // Center around New York for our demo data
  const center = { lat: 40.712, lng: -74.006 };

  // Calculate color based on pressure
  const getMarkerColor = (pressure) => {
    if (pressure > 80) return '#ef4444'; // Red (Critical)
    if (pressure > 50) return '#f59e0b'; // Amber (Moderate)
    return '#10b981'; // Green (Clear)
  };

  return (
    <div 
      className="h-[600px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
      role="region"
      aria-label="Live venue crowd density map"
    >
      <APIProvider apiKey={MAPS_API_KEY}>
        <Map
          defaultCenter={center}
          defaultZoom={17}
          mapId="DEMO_MAP_ID"
          className="w-full h-full"
          disableDefaultUI={true}
          gestureHandling="greedy"
        >
          {zones.map((zone) => {
            if (!zone.lat || !zone.lng) return null;
            return (
              <AdvancedMarker
                key={zone.id}
                position={{ lat: zone.lat, lng: zone.lng }}
                title={`${zone.name} - Pressure: ${zone.pressureScore?.toFixed(0)}`}
              >
                <div className="relative group" role="img" aria-label={`${zone.name}: ${zone.pressureScore > 80 ? 'Critical' : zone.pressureScore > 50 ? 'Moderate' : 'Clear'} density`}>
                  <Pin background={getMarkerColor(zone.pressureScore)} borderColor="rgba(0,0,0,0.5)" glyphColor="#fff" />
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-white text-xs rounded px-3 py-2 shadow-xl pointer-events-none z-50">
                    <p className="font-bold">{zone.name}</p>
                    <p className="text-slate-300">Wait: {zone.waitTime}m</p>
                    <p className="text-slate-300">Pressure: {zone.pressureScore?.toFixed(0)}</p>
                  </div>
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
}
