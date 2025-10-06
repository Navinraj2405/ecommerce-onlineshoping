// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import {getAuth} from "firebase/auth";
 
const firebaseConfig = {
  apiKey: "AIzaSyDrs1r4hVQ0wObqTHoEviSuAGI6jXIpzeE",
  authDomain: "learnbasics-b8efc.firebaseapp.com",
  projectId: "learnbasics-b8efc",
  storageBucket: "learnbasics-b8efc.firebasestorage.app",
  messagingSenderId: "367081988569",
  appId: "1:367081988569:web:3a0c54d85171961b12f9c8",
  measurementId: "G-PD1MV2PJKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
