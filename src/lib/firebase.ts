import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDPvCZs2wQeKlj5gluNnVp9wLQYBCUNcNE",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "twentyfive-68777.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "twentyfive-68777",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "twentyfive-68777.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "81523227450",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:81523227450:web:df2cf1ac868847a404ee03",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-WPFP3NHVH0"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
