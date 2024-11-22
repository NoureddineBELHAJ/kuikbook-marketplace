import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCILDpRBI9vS-Q17Shf_r7UmG_7po4KnP4",
  authDomain: "kuikbook-marketplace.firebaseapp.com",
  projectId: "kuikbook-marketplace",
  storageBucket: "kuikbook-marketplace.firebasestorage.app",
  messagingSenderId: "1024700952286",
  appId: "1:1024700952286:web:6c7d80deed91137d459c4f",
  measurementId: "G-CLXEYZVL2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);

// Auth state observer
export const onAuthStateChanged = (callback) => {
  return auth.onAuthStateChanged(callback);
};

// Custom claims for admin
export const ADMIN_EMAIL = 'framework.ma@gmail.com';
export const isAdmin = (user) => user?.email === ADMIN_EMAIL;

export default app;