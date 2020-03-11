function createNewKey() {
  const length = 64;
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function drawQRCode(key) {
  const URL_BASE = "http://maavarim.github.io/?key=";
  document.getElementById("qr-code").innerHTML = "";
  new QRCode(document.getElementById("qr-code"), {
    text: URL_BASE + key
  });
}

function updateDownloadButton() {
  const data = document.getElementById("qr-code").children[1].src;
  const downloadButton = document.getElementById("download");
  downloadButton.setAttribute("href", data);
  downloadButton.setAttribute("download", "qr-code.jpg");
}

function showEmptyNameError() {
  alert("אנא הזינו שם.");
}

function displayNewKey() {
  const name = document.getElementById("name").value;
  if (!name) {
    showEmptyNameError();
    return;
  }

  const key = createNewKey();

  const db = firebase.firestore();
  db.collection("members")
    .doc(key)
    .set({
      name,
      isActive: true
    });

  drawQRCode(key);
  document.getElementById("key").value = key;
  setTimeout(() => updateDownloadButton(), 0);
  document.getElementById("key-container").style.display = "flex";

  document.getElementById("key").select();
  document.execCommand("copy");
}

var firebaseConfig = {
  apiKey: "AIzaSyB_fQwG_Ob9eA9ctlYNgRsZu1PejQ_nYg4",
  authDomain: "maavarimsfriends.firebaseapp.com",
  databaseURL: "https://maavarimsfriends.firebaseio.com",
  projectId: "maavarimsfriends",
  storageBucket: "maavarimsfriends.appspot.com",
  messagingSenderId: "710424664455",
  appId: "1:710424664455:web:16ecdcb87fb007ecc51b22"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();

function auth() {
  function showAuthError() {
    document.getElementById("auth-error").style.display = "block";
  }
  function showPanel() {
    document.getElementById("auth-container").style.display = "none";
    document.getElementById("panel").style.display = "block";
  }
  const AMDIN_EMAIL = "maavarim.club@gmail.com";
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function(result) {
      var { email } = result.user;
      if (email == AMDIN_EMAIL) showPanel();
      else showAuthError();
    })
    .catch(function(_) {
      showAuthError();
    });
}
