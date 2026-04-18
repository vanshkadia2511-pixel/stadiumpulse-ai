import React, { createContext, useContext, useEffect, useReducer } from 'react';
import mockData from '../data/mockCrowd.json';

const StadiumContext = createContext();

const initialState = {
  zones: mockData,
  mode: 'local' // local or live
};

function stadiumReducer(state, action) {
  switch (action.type) {
    case 'SET_ZONES':
      return { ...state, zones: action.payload };
    case 'UPDATE_ZONE':
      return {
        ...state,
        zones: state.zones.map(zone =>
          zone.id === action.payload.id ? { ...zone, ...action.payload } : zone
        )
      };
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}

export function StadiumProvider({ children }) {
  const [state, dispatch] = useReducer(stadiumReducer, initialState);

  // Simulation Loop
  useEffect(() => {
    if (state.mode === 'local') {
      const interval = setInterval(() => {
        const updatedZones = state.zones.map(zone => {
          const drift = Math.floor(Math.random() * 11) - 5; // -5 to +5
          let newOccupancy = zone.current_occupancy_percentage + drift;
          newOccupancy = Math.max(0, Math.min(100, newOccupancy));
          
          let trend = 'stable';
          if (drift > 2) trend = 'rising';
          else if (drift < -2) trend = 'falling';
          
          return {
            ...zone,
            current_occupancy_percentage: newOccupancy,
            trend
          };
        });
        
        dispatch({ type: 'SET_ZONES', payload: updatedZones });
      }, 8000);
      
      return () => clearInterval(interval);
    }
  }, [state.zones, state.mode]);

  return (
    <StadiumContext.Provider value={{ state, dispatch }}>
      {children}
    </StadiumContext.Provider>
  );
}

export function useStadium() {
  return useContext(StadiumContext);
}
