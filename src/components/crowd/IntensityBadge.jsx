import React from 'react';

export default function IntensityBadge({ occupancy }) {
  let intensity = 'LOW';
  let colorClass = 'bg-field-green/20 text-field-green border-field-green/30';
  let dotClass = 'bg-field-green';

  if (occupancy > 90) {
    intensity = 'CRITICAL';
    colorClass = 'bg-pulse-red/20 text-pulse-red border-pulse-red/30';
    dotClass = 'bg-pulse-red animate-pulse-slow';
  } else if (occupancy > 70) {
    intensity = 'HIGH';
    colorClass = 'bg-crowd-amber/20 text-crowd-amber border-crowd-amber/30';
    dotClass = 'bg-crowd-amber';
  } else if (occupancy > 40) {
    intensity = 'MODERATE';
    colorClass = 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
    dotClass = 'bg-yellow-500';
  }

  return (
    <div className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wider ${colorClass} transition-colors duration-300`}>
      <div className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></div>
      <span>{intensity}</span>
    </div>
  );
}
