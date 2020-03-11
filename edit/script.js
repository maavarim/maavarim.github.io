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

function addRow(table, key, name, registarationDate, isActive) {
  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.innerText = name;
  row.appendChild(nameCell);

  const registarationDateCell = document.createElement("td");
  registarationDateCell.innerText = registarationDate;
  row.appendChild(registarationDateCell);

  const isActiveCell = document.createElement("td");
  isActiveCell.innerText = isActive ? "פעילה" : "לא פעילה";
  row.appendChild(isActiveCell);

  function toggleSubscription(key) {
    db.collection("members")
      .doc(key)
      .update({ isActive: !isActive })
      .then(_ => {
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

  function openQRCode(key) {
    const tmpQRContainer = document.createElement("div");
    const URL_BASE = "http://maavarim.github.io/?key=";
    new QRCode(tmpQRContainer, {
      text: URL_BASE + key,
      backgroundImage: "../logo.jpg",
      autoColor: true,
      backgroundImageAlpha: 0.75,
      dotScale: 0.5,
      quietZone: 12
    });
    setTimeout(() => {
      const data = tmpQRContainer.children[1].src;
      var newTab = window.open();
      newTab.document.body.innerHTML = `<div dir="rtl"><img src="${data}" width="265px" height="265px"><br/><br/><a href="${data}" download="qr-code.jpg">הורדה</a></div>`;
      tmpQRContainer.remove();
    }, 200);
  }

  const openQRCodeCell = document.createElement("td");
  const openQRCodeLink = document.createElement("a");
  openQRCodeLink.innerText = "QR Code";
  openQRCodeLink.href = "#";
  openQRCodeLink.addEventListener("click", () => openQRCode(key));
  openQRCodeCell.appendChild(openQRCodeLink);
  const space = document.createElement("spa");
  space.innerText = "\xa0\xa0";
  openQRCodeCell.appendChild(space);
  const removeLink = document.createElement("a");
  function remove(key) {
    db.collection("members")
      .doc(key)
      .delete()
      .then(_ => {
        removeLink.style = "pointer-events: none; cursor: default; color: black;";
        removeLink.innerHTML = "בוצע";
      });
  }
  removeLink.innerText = "מחיקה";
  removeLink.href = "#";
  removeLink.addEventListener("click", () => remove(key));
  openQRCodeCell.appendChild(removeLink);
  row.appendChild(openQRCodeCell);

  table.appendChild(row);
}

function createTable(container) {
  const table = document.createElement("table");

  const row = document.createElement("tr");
  const nameCell = document.createElement("th");
  nameCell.innerText = "שם חבר.ת מועדון";
  row.appendChild(nameCell);
  const registarationDateCell = document.createElement("th");
  registarationDateCell.innerText = "תאריך הצטרפות";
  row.appendChild(registarationDateCell);
  const statusCell = document.createElement("th");
  statusCell.innerText = "סטטוס הרשמה";
  row.appendChild(statusCell);
  const blankCell = document.createElement("th");
  row.appendChild(blankCell);
  const anotherBlankCell = document.createElement("th");
  row.appendChild(anotherBlankCell);
  table.appendChild(row);

  container.innerHTML = "";
  container.appendChild(table);
  return table;
}

function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return `${day}/${month}/${year}`;
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
        const { name, createdAt: firebaseCreatedAt, isActive } = doc.data();
        const createdAt = formatDate(firebaseCreatedAt.toDate());

        addRow(
          table,
          doc.id,
          name,
          createdAt,
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
