import React, { useState, useEffect } from 'react';

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="flex justify-between items-center p-6 border-b border-white/10 bg-night-blue/80 backdrop-blur-md">
      <div>
        <h2 className="font-display text-2xl font-semibold text-white tracking-tight">Match Day — Stadium Arena</h2>
        <p className="text-gray-400 text-sm mt-1">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
      </div>
      <div className="flex items-center space-x-2 bg-field-green/20 text-field-green px-4 py-2 rounded-full border border-field-green/30">
        <div className="w-2 h-2 rounded-full bg-field-green animate-pulse-slow"></div>
        <span className="text-sm font-bold tracking-wider">LIVE</span>
      </div>
    </header>
  );
}
