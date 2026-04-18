import { useEffect } from 'react';
import { subscribeToZones } from '../firebase/firestoreService';

export function useZones(dispatch) {
  useEffect(() => {
    const unsubscribe = subscribeToZones((zones) => {
      // Dispatch the updated zones to StadiumContext
      if (zones && zones.length > 0) {
         dispatch({ type: 'SET_ZONES', payload: zones });
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dispatch]);
}
