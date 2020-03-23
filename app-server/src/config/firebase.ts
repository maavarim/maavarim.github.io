require("dotenv").config();
import * as admin from "firebase-admin";

export default admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "maavarimfriendly",
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  }),
  databaseURL: "https://maavarimfriendly.firebaseio.com"
});
