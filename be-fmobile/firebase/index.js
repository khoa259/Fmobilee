import firebase from "firebase-admin";

import serviceAccount from "../configs/fbServiceAccountKey.json" assert { type: "json" };

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
});

export default firebase;
