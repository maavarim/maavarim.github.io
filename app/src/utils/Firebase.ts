import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0e79ilwZg5BVUUOrYB6iAj1w0FZiAkcU",
  authDomain: "maavarimfriendly.firebaseapp.com",
  databaseURL: "https://maavarimfriendly.firebaseio.com",
  projectId: "maavarimfriendly",
  storageBucket: "maavarimfriendly.appspot.com",
  messagingSenderId: "479517849359",
  appId: "1:479517849359:web:998d592de50fe007b4707a",
  measurementId: "G-5YNF4DPSTE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
