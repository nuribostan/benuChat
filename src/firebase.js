
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1jmwwA5Tffj1DAOgy43He0cBgB4VZAPs",
  authDomain: "benuchat-92a5b.firebaseapp.com",
  projectId: "benuchat-92a5b",
  storageBucket: "benuchat-92a5b.appspot.com",
  messagingSenderId: "14417579269",
  appId: "1:14417579269:web:8ab6bde05da6097ec13b6c"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();