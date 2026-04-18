import React from 'react';
import IntensityBadge from './IntensityBadge';
import CrowdMeter from './CrowdMeter';

export default function SectionCard({ zone }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300 group cursor-pointer animate-fade-in relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-white font-display font-semibold text-lg">{zone.name}</h3>
            <p className="text-gray-400 text-xs">ID: {zone.id.replace('zone_', '').replace(/_/g, ' ').toUpperCase()}</p>
          </div>
          <IntensityBadge occupancy={zone.current_occupancy_percentage} />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-end mb-1">
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-display font-bold text-white tracking-tighter">
                {zone.current_occupancy_percentage}%
              </span>
              <span className="text-gray-400 text-xs uppercase font-medium tracking-wider">Fill</span>
            </div>
            
            <div className="flex items-center space-x-1">
              {zone.trend === 'rising' && <svg className="w-4 h-4 text-pulse-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
              {zone.trend === 'falling' && <svg className="w-4 h-4 text-field-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>}
              {zone.trend === 'stable' && <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>}
            </div>
          </div>
          
          <CrowdMeter occupancy={zone.current_occupancy_percentage} />
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Wait Time</span>
            <span className="text-white font-medium">{zone.wait_time_minutes} min</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Capacity</span>
            <span className="text-gray-300 font-medium">{zone.capacity.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
