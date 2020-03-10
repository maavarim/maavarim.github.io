var firebaseConfig = {
  apiKey: "AIzaSyB_fQwG_Ob9eA9ctlYNgRsZu1PejQ_nYg4",
  authDomain: "maavarimsfriends.firebaseapp.com",
  databaseURL: "https://maavarimsfriends.firebaseio.com",
  projectId: "maavarimsfriends",
  storageBucket: "maavarimsfriends.appspot.com",
  messagingSenderId: "710424664455",
  appId: "1:710424664455:web:16ecdcb87fb007ecc51b22"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function addRow(table, key, name, isActive) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.innerText = name;
  row.appendChild(nameCell);

  const isActiveCell = document.createElement("td");
  isActiveCell.innerText = isActive ? "פעיל" : "לא פעיל";
  row.appendChild(isActiveCell);

  function toggleSubscription(key) {
    db.collection("members")
      .doc(key)
      .update({ isActive: !isActive })
      .then(res => {
        console.log(res);
        toggleSubscriptionCell.innerHTML = "בוצע";
      });
  }

  const toggleSubscriptionCell = document.createElement("td");
  const toggleSubscriptionLink = document.createElement("a");
  toggleSubscriptionLink.innerText = isActive ? "השבתה" : "הפעלה מחדש";
  toggleSubscriptionLink.href = "#";
  toggleSubscriptionLink.addEventListener("click", () =>
    toggleSubscription(key)
  );
  toggleSubscriptionCell.appendChild(toggleSubscriptionLink);
  row.appendChild(toggleSubscriptionCell);

  table.appendChild(row);
}

function createTable(container) {
  const table = document.createElement("table");

  const row = document.createElement("tr");
  const nameCell = document.createElement("th");
  nameCell.innerText = "שם חבר.ת מועדון";
  row.appendChild(nameCell);
  const statusCell = document.createElement("th");
  statusCell.innerText = "סטטוס הרשמה";
  row.appendChild(statusCell);
  const blankCell = document.createElement("th");
  row.appendChild(blankCell);
  table.appendChild(row);

  container.innerHTML = "";
  container.appendChild(table);
  return table;
}

function cancel() {
  const requestedName = document.getElementById("name").value;
  const resultContainer = document.getElementById("result");
  const table = createTable(resultContainer);

  db.collection("members")
    .where("name", ">=", requestedName)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        const { name, isActive } = doc.data();
        addRow(
          table,
          doc.id,
          name,
          isActive === true || isActive === undefined
        );
      });
    });
}

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
