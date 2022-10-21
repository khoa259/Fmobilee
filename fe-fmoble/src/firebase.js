import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyADv0a30ER2lTz3cpHumWSa0hQRZs7gN38",
  authDomain: "e-commerce-ab499.firebaseapp.com",
  projectId: "e-commerce-ab499",
  storageBucket: "e-commerce-ab499.appspot.com",
  messagingSenderId: "234898542759",
  appId: "1:234898542759:web:c27975f15de1c0a775cb82",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// export const fireAuth = getAuth(app);
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
