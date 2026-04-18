import React from 'react'
import { StadiumProvider } from './context/StadiumState'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <StadiumProvider>
      <AppShell>
        <Dashboard />
      </AppShell>
    </StadiumProvider>
  )
}

export default App
