import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA9hIysOWJrogWsFaEfpfC5aCs8BYXcogA",
  authDomain: "norvam.firebaseapp.com",
  databaseURL: "https://norvam-default-rtdb.firebaseio.com",
  projectId: "norvam",
  storageBucket: "norvam.appspot.com",
  messagingSenderId: "626223283127",
  appId: "1:626223283127:web:2e68f6e5e3c316ba264632",
  measurementId: "G-9BJHP57QY2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);

export { db, firebaseConfig };