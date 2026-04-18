import React from 'react';
import { useStadium } from '../context/StadiumContext';
import SectionCard from '../components/crowd/SectionCard';

export default function Dashboard() {
  const { state } = useStadium();

  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight mb-2">Venue Overview</h1>
        <p className="text-gray-400">Live crowd intelligence and density mapping across all sectors.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {state.zones.map(zone => (
          <SectionCard key={zone.id} zone={zone} />
        ))}
      </div>
    </div>
  );
}
