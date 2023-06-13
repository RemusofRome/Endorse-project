// Meta
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Variables

const appSettings = {
  databaseURL: "https://endorsements-1bd30-default-rtdb.firebaseio.com/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoutoutsinDB = ref(database, "shoutouts");

const buttonEl = document.getElementById("button-el");
const paragraphEl = document.getElementById("paragraph-el");
const toEl = document.getElementById("To-el");
const fromEl = document.getElementById("From-el");
let endText = document.getElementById("endtext");

//On start
console.log("hello");
clearInput();

onValue(shoutoutsinDB, function (snapshot) {
  if (snapshot.exists()) {
    let textArr = Object.entries(snapshot.val());
    clearEndText();
    for (let i = 0; i < textArr.length; i++) {
      let currentText = textArr[i];
      let currentId = currentText[0];
      let currentPhrase = currentText[1];
      console.log(currentText);
      pushValue(currentText);
    }
  } else {
    endText.innerHTML = "Write a shout out to show your appreciation!";
  }
});

// Functions
function clearInput() {
  toEl.value = "";
  fromEl.value = "";
  paragraphEl.value = "";
  console.log("inputs cleared");
}

function clearEndText() {
  endText.innerHTML = "";
}

function pushValue(text) {
  let textID = text[0];
  let textValue = text[1];
  let newEl = document.createElement("textarea");
  newEl.innerHTML = textValue;
  newEl.addEventListener("click", function () {
    let exactLocation = ref(database, `shoutouts/${textID}`);
    remove(exactLocation);
  });
  endText.append(newEl);
}

//Events
buttonEl.addEventListener("click", function () {
  let inputValue = `To: ${toEl.value} \n\n ${paragraphEl.value} \n\n From: ${fromEl.value}`;
  if (toEl.value === "" || paragraphEl.value === "" || fromEl.value === "") {
    alert("Field must be filled out");
    return false;
  } else {
    push(shoutoutsinDB, inputValue);
  }
  clearInput();
});
