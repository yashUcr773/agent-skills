import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../serviceAccount.json';

const app = getApps()[0] || initializeApp(
  process.env.FIRESTORE_EMULATOR_HOST
    ? { projectId: serviceAccount.project_id }
    : { credential: cert(serviceAccount) }
);

export const adminDb = getFirestore(app);
