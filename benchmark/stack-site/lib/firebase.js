import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const app = getApps()[0] || initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
});

export const db = getFirestore(app);

const emulator = process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR;
if (emulator && !globalThis.__firestoreEmulatorConnected) {
  const [host, port] = emulator.split(':');
  connectFirestoreEmulator(db, host, Number(port));
  globalThis.__firestoreEmulatorConnected = true;
}
