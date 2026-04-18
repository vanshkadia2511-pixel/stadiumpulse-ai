import React from 'react';

export default function SuggestionChips({ onSelect, disabled }) {
  const suggestions = [
    "What is the shortest route from the North Gate to Section 102?",
    "Which food court has the shortest wait time?",
    "Are there any critical bottlenecks forming right now?"
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 pt-0">
      {suggestions.map((s, i) => (
        <button
          key={i}
          disabled={disabled}
          onClick={() => onSelect(s)}
          className="bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-white text-sm px-3 py-1.5 rounded-full transition-colors border border-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-left"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
