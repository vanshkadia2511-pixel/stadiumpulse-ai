import { db } from './firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore';
import mockCrowd from '../data/mockCrowd.json';

export async function seedFirestore() {
  console.log('Starting seed process...');
  for (const zone of mockCrowd) {
    const { id, ...data } = zone;
    const docRef = doc(db, 'zones', id);
    try {
      await setDoc(docRef, {
        ...data,
        last_updated: new Date().toISOString()
      });
      console.log(`Seeded zone: ${id}`);
    } catch (err) {
      console.error(`Failed to seed ${id}:`, err);
    }
  }
  console.log('Seed process complete.');
}
