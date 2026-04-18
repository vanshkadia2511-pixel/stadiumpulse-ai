import React from 'react';

export default function CrowdMeter({ occupancy }) {
  let colorClass = 'bg-field-green';
  if (occupancy > 70) colorClass = 'bg-pulse-red';
  else if (occupancy > 40) colorClass = 'bg-crowd-amber';

  return (
    <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
      <div 
        className={`${colorClass} h-1.5 rounded-full transition-all duration-500 ease-out`} 
        style={{ width: `${occupancy}%` }}
      ></div>
    </div>
  );
}
