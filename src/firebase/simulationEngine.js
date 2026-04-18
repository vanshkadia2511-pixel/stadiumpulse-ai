import { db } from './firebaseConfig';
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

let simulationInterval = null;

export function startSimulation() {
  if (simulationInterval) return;
  console.log("Starting Firebase Simulation Engine...");
  
  simulationInterval = setInterval(async () => {
    try {
      const snap = await getDocs(collection(db, 'zones'));
      snap.forEach(async (zoneDoc) => {
        const data = zoneDoc.data();
        const drift = Math.floor(Math.random() * 11) - 5; // -5 to +5
        let newOccupancy = data.current_occupancy_percentage + drift;
        newOccupancy = Math.max(0, Math.min(100, newOccupancy));
        
        let trend = 'stable';
        if (drift > 2) trend = 'rising';
        else if (drift < -2) trend = 'falling';

        await updateDoc(doc(db, 'zones', zoneDoc.id), {
          current_occupancy_percentage: newOccupancy,
          trend,
          last_updated: new Date().toISOString()
        });
      });
    } catch (err) {
      console.error("Simulation tick failed:", err);
    }
  }, 8000);
}

export function stopSimulation() {
  if (simulationInterval) {
    clearInterval(simulationInterval);
    simulationInterval = null;
    console.log("Stopped Firebase Simulation Engine.");
  }
}
