import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_fQwG_Ob9eA9ctlYNgRsZu1PejQ_nYg4",
  authDomain: "maavarimsfriends.firebaseapp.com",
  databaseURL: "https://maavarimsfriends.firebaseio.com",
  projectId: "maavarimsfriends",
  storageBucket: "maavarimsfriends.appspot.com",
  messagingSenderId: "710424664455",
  appId: "1:710424664455:web:16ecdcb87fb007ecc51b22"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().useDeviceLanguage();

export default firebase;
