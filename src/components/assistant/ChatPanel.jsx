import React, { useContext, useEffect, useRef } from 'react';
import { StadiumContext } from '../../context/StadiumState';
import { useGeminiChat } from '../../hooks/useGeminiChat';
import MessageInput from './MessageInput';
import SuggestionChips from './SuggestionChips';
import ReactMarkdown from 'react-markdown';

export default function ChatPanel() {
  const { state } = useContext(StadiumContext);
  const { zones } = state;
  const { messages, isTyping, error, sendMessage } = useGeminiChat(zones);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-[600px] bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Crowd Oracle AI</h2>
            <p className="text-xs text-blue-400 font-medium">Powered by Gemini 2.0 Flash</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-6"
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'
              }`}
            >
              <ReactMarkdown className="prose prose-invert prose-p:leading-relaxed prose-sm max-w-none">
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start" aria-live="polite">
            <div className="bg-slate-700 rounded-2xl rounded-bl-none px-5 py-4 border border-slate-600">
              <span className="sr-only">AI is thinking...</span>
              <div className="flex gap-1.5" aria-hidden="true">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center p-3 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm">
            {error}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions and Input */}
      <div className="bg-slate-800">
        <SuggestionChips onSelect={sendMessage} disabled={isTyping} />
        <MessageInput onSend={sendMessage} isTyping={isTyping} />
      </div>
    </div>
  );
}
