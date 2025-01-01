import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { setupAdminUser } from '../utils/setupAdmin';

const firebaseConfig = {
  apiKey: "AIzaSyAUYti2Qxug8cL4cHoRLb3ILuOPWZ6Hkto",
  authDomain: "selfvestor-d5b2b.firebaseapp.com",
  projectId: "selfvestor-d5b2b",
  storageBucket: "selfvestor-d5b2b.firebasestorage.app",
  messagingSenderId: "1078407811653",
  appId: "1:1078407811653:web:11de4b9eaa69030432092c",
  measurementId: "G-2PWBNBWN7P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();

// Setup admin user on initialization
setupAdminUser().catch(console.error);