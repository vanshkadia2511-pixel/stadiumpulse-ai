import React, { createContext, useContext, useEffect, useReducer } from 'react';
import mockData from '../data/mockCrowd.json';
import { useZones } from '../hooks/useZones';
import { startSimulation, stopSimulation } from '../firebase/simulationEngine';
import { computePressureScore } from '../utils/crowdAlgorithm';

// Context for global stadium state and real-time updates
export const StadiumContext = createContext();

const initialState = {
  zones: mockData.map(z => ({ ...z, pressureScore: computePressureScore(z) })),
  history: {}, // { zoneId: [{ wait_time_minutes, current_occupancy_percentage, timestamp }] }
  mode: import.meta.env.VITE_DEMO_MODE === 'true' ? 'demo' : 'live'
};

function stadiumReducer(state, action) {
  switch (action.type) {
    case 'SET_ZONES': {
      const newZones = action.payload.map(z => ({
        ...z,
        pressureScore: computePressureScore(z)
      }));
      
      const newHistory = { ...state.history };
      newZones.forEach(z => {
        if (!newHistory[z.id]) newHistory[z.id] = [];
        newHistory[z.id].push({
          wait_time_minutes: z.wait_time_minutes,
          current_occupancy_percentage: z.current_occupancy_percentage,
          timestamp: new Date().toISOString()
        });
        // Keep only last 5 readings
        if (newHistory[z.id].length > 5) {
          newHistory[z.id].shift();
        }
      });

      return { ...state, zones: newZones, history: newHistory };
    }
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}

export function StadiumProvider({ children }) {
  const [state, dispatch] = useReducer(stadiumReducer, initialState);

  // Subscribe to live Firestore updates
  useZones(dispatch);

  // Simulation Loop for Demo Mode
  useEffect(() => {
    if (state.mode === 'demo') {
      startSimulation();
    } else {
      stopSimulation();
    }
    
    return () => stopSimulation();
  }, [state.mode]);

  return (
    <StadiumContext.Provider value={{ state, dispatch }}>
      {children}
    </StadiumContext.Provider>
  );
}

export function useStadium() {
  return useContext(StadiumContext);
}
