import React, { useState } from 'react';

export default function MessageInput({ onSend, isTyping }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !isTyping) {
      onSend(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t border-slate-700 bg-slate-800/50">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isTyping}
        placeholder="Ask the Oracle about crowd routing..."
        className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={!text.trim() || isTyping}
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
      >
        {isTyping ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          'Send'
        )}
      </button>
    </form>
  );
}
