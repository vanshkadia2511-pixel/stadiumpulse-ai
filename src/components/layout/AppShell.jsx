import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell({ children }) {
  return (
    <div className="flex h-screen bg-night-blue overflow-hidden selection:bg-pulse-red selection:text-white">
      <Sidebar />
      <div className="flex flex-col flex-1 w-full relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
