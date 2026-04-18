// seed.mjs — Run with: node seed.mjs
import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Manually load .env file
const envFile = readFileSync('.env', 'utf-8');
const env = Object.fromEntries(
  envFile.split('\n')
    .filter(line => line.trim() && !line.startsWith('#') && line.includes('='))
    .map(line => {
      const [key, ...rest] = line.split('=');
      return [key.trim(), rest.join('=').trim()];
    })
);

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const zones = JSON.parse(readFileSync('./src/data/mockCrowd.json', 'utf-8'));

console.log(`Seeding ${zones.length} zones to Firestore project: ${env.VITE_FIREBASE_PROJECT_ID}`);

for (const zone of zones) {
  const { id, ...data } = zone;
  try {
    await setDoc(doc(db, 'zones', id), {
      ...data,
      last_updated: new Date().toISOString(),
    });
    console.log(`✅ Seeded: ${id}`);
  } catch (err) {
    console.error(`❌ Failed to seed ${id}:`, err.message);
  }
}

console.log('🎉 Seed complete!');
process.exit(0);
