import { initializeApp } from "firebase/app";
import {getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6NpnJPw4GhPXTuYbVPp3uEq4jsO5iC2c",
  authDomain: "nushower-55a72.firebaseapp.com",
  projectId: "nushower-55a72",
  storageBucket: "nushower-55a72.firebasestorage.app",
  messagingSenderId: "823807580163",
  appId: "1:823807580163:web:097ac043dca18a8059d636",
  measurementId: "G-DDM5YTH8H5"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);