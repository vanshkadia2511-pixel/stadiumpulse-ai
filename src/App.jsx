import React from 'react'
import { StadiumProvider } from './context/StadiumState'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import { db } from './firebase/firebaseConfig'

function App() {
  if (!db) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-white">Configuration Required</h1>
          <p className="text-gray-400">
            The application is missing Firebase environment variables. 
            Please ensure you have configured your <code className="bg-white/10 px-1 rounded">VITE_FIREBASE_*</code> secrets in your build environment.
          </p>
          <div className="bg-pulse-red/10 border border-pulse-red/30 p-4 rounded-lg text-pulse-red text-sm">
            Check the browser console for details.
          </div>
        </div>
      </div>
    )
  }

  return (
    <StadiumProvider>
      <AppShell>
        <Dashboard />
      </AppShell>
    </StadiumProvider>
  )
}

export default App
