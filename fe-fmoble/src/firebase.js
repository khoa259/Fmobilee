// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Y18RqU5Kg1V2pocpSBSZaCZV2h6kmRQ",
  authDomain: "fmobile-7ed64.firebaseapp.com",
  projectId: "fmobile-7ed64",
  storageBucket: "fmobile-7ed64.appspot.com",
  messagingSenderId: "13997989081",
  appId: "1:13997989081:web:605921d68d1c3d1682b2c8",
  measurementId: "G-N7SKQXS9B3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuth = GoogleAuthProvider();
