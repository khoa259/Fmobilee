import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyADv0a30ER2lTz3cpHumWSa0hQRZs7gN38",
  authDomain: "e-commerce-ab499.firebaseapp.com",
  projectId: "e-commerce-ab499",
  storageBucket: "e-commerce-ab499.appspot.com",
  messagingSenderId: "234898542759",
  appId: "1:234898542759:web:c27975f15de1c0a775cb82",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireAuth = getAuth(app);
