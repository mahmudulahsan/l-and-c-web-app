import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDrajma-zB2JyE-4iNPS8iTo8v7AfkF_tg",
  authDomain: "loan-crowdsourcing.firebaseapp.com",
  projectId: "loan-crowdsourcing",
  storageBucket: "loan-crowdsourcing.appspot.com",
  messagingSenderId: "113435130375",
  appId: "1:113435130375:web:9834bba550c791178b88a2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
