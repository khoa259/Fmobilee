import firebase from "firebase-admin";

var serviceAccount = require("../configs/fbServiceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

export default firebase;
