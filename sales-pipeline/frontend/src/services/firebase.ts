import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAnFT9Oa8UEfIn4xIWk446nYugoa6MJOz4",
    authDomain: "leads-analysis-75d9d.firebaseapp.com",
    projectId: "leads-analysis-75d9d",
    storageBucket: "leads-analysis-75d9d.firebasestorage.app",
    messagingSenderId: "182018571670",
    appId: "1:182018571670:web:205cce74c440791214f1b7",
    measurementId: "G-FKBQD9J5HK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
