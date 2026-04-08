import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAtN91ruu8qBIcnU7vV0LPuBL2Jr-zKisg",
  authDomain: "roundu-workspace.firebaseapp.com",
  projectId: "roundu-workspace",
  storageBucket: "roundu-workspace.firebasestorage.app",
  messagingSenderId: "981633793399",
  appId: "1:981633793399:web:a8337c484a5d9c1174b572",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
