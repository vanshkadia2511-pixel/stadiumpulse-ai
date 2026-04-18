import React, { useState } from 'react';
import { useStadium } from '../context/StadiumState';
import { useCrowdOracle } from '../hooks/useCrowdOracle';
import SectionCard from '../components/crowd/SectionCard';
import ChatPanel from '../components/assistant/ChatPanel';
import VenueMap from '../components/map/VenueMap';

export default function Dashboard() {
  const { state } = useStadium();
  const { getTopRecommendations, getBestRoute } = useCrowdOracle();
  const suggestions = getTopRecommendations();
  
  const [routeStart, setRouteStart] = useState('');
  const [routeEnd, setRouteEnd] = useState('');
  const [routeResult, setRouteResult] = useState(null);

  const handleFindRoute = () => {
    if (routeStart && routeEnd) {
      setRouteResult(getBestRoute(routeStart, routeEnd));
    }
  };

  return (
    <div className="animate-slide-up space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-tight mb-2">Venue Overview</h1>
          <p className="text-gray-400">Live crowd intelligence and density mapping across all sectors.</p>
        </div>
        
        {/* Oracle Suggestions */}
        {suggestions.length > 0 && (
          <div className="flex flex-col gap-2 flex-1 max-w-md">
            <span className="text-xs uppercase tracking-widest text-pulse-red font-bold flex items-center gap-1">
              <svg className="w-4 h-4 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Oracle Insights
            </span>
            {suggestions.map(s => (
              <div key={s.id} className={`text-sm px-3 py-2 rounded border ${s.type === 'warning' ? 'bg-pulse-red/10 border-pulse-red/30 text-red-200' : 'bg-field-green/10 border-field-green/30 text-green-200'}`}>
                {s.message}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Map and Routes */}
        <div className="lg:col-span-2 space-y-8">
          <VenueMap />
          
          {/* Path Finder UI */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Start Zone</label>
              <select value={routeStart} onChange={e => setRouteStart(e.target.value)} className="w-full bg-night-blue border border-white/10 rounded p-2 text-white">
                <option value="">Select starting point...</option>
                {state.zones.map(z => <option key={`start-${z.id}`} value={z.id}>{z.name}</option>)}
              </select>
            </div>
            <div className="flex-1 w-full">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Destination</label>
              <select value={routeEnd} onChange={e => setRouteEnd(e.target.value)} className="w-full bg-night-blue border border-white/10 rounded p-2 text-white">
                <option value="">Select destination...</option>
                {state.zones.map(z => <option key={`end-${z.id}`} value={z.id}>{z.name}</option>)}
              </select>
            </div>
            <button onClick={handleFindRoute} disabled={!routeStart || !routeEnd} className="bg-pulse-red hover:bg-red-600 text-white font-medium py-2 px-6 rounded transition-colors disabled:opacity-50">
              Find Route
            </button>
          </div>

          {routeResult && (
            <div className="bg-pulse-red/10 border border-pulse-red/30 rounded-xl p-4 animate-fade-in">
              <h3 className="text-pulse-red font-bold mb-2">Quietest Path Found:</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-white">
                {routeResult.map((node, i) => (
                  <React.Fragment key={`path-${i}`}>
                    <span className="bg-night-blue px-2 py-1 rounded border border-white/10">
                      {state.zones.find(z => z.id === node)?.name || node}
                    </span>
                    {i < routeResult.length - 1 && <span className="text-gray-500">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: AI Assistant */}
        <div className="lg:col-span-1">
          <ChatPanel />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {state.zones.map(zone => (
          <SectionCard key={zone.id} zone={zone} />
        ))}
      </div>
    </div>
  );
}
