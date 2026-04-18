import { db } from './firebaseConfig';
import { collection, onSnapshot, doc, getDoc, addDoc, setDoc } from "firebase/firestore";

export function subscribeToZones(callback) {
  const zonesRef = collection(db, 'zones');
  return onSnapshot(zonesRef, (snapshot) => {
    const zones = [];
    snapshot.forEach(doc => {
      zones.push({ id: doc.id, ...doc.data() });
    });
    callback(zones);
  }, console.error);
}

export async function getZoneOnce(zoneId) {
  const zoneRef = doc(db, 'zones', zoneId);
  const snap = await getDoc(zoneRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function addUserReport(reportData) {
  const reportsRef = collection(db, 'user_reports');
  return addDoc(reportsRef, {
    ...reportData,
    timestamp: new Date().toISOString()
  });
}

export async function getBotMemory(sessionId) {
  const memRef = doc(db, 'bot_memory', sessionId);
  const snap = await getDoc(memRef);
  return snap.exists() ? snap.data() : null;
}

export async function updateBotMemory(sessionId, patch) {
  const memRef = doc(db, 'bot_memory', sessionId);
  return setDoc(memRef, patch, { merge: true });
}
