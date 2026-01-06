// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD3xSz1PBNzj-z-fasgx8eRX7p0vjmzIHo',
  authDomain: 'calculatorfirstapp.firebaseapp.com',
  projectId: 'calculatorfirstapp',
  storageBucket: 'calculatorfirstapp.firebasestorage.app',
  messagingSenderId: '153908405074',
  appId: '1:153908405074:web:04c669db83f2b6149ad08b',
  measurementId: 'G-Q2QSG1GMD0'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Optional analytics (only works in browser)
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // analytics might fail in non-browser env or if not allowed
  analytics = undefined;
}

export const firebaseApp = app;
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();