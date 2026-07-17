import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const tournamentSelect = document.getElementById("tournamentSelect");

async function loadTournament() {
    try {

        tournamentSelect.innerHTML =
            '<option value="">Select Tournament</option>';

        const snap = await getDoc(doc(db, "tournament", "current"));

        if (snap.exists()) {
            const data = snap.data();

            const option = document.createElement("option");
            option.value = "current";
            option.textContent = data.tournamentName;

            tournamentSelect.appendChild(option);
        }

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

loadTournament();

const saveBtn = document.getElementById("saveBtn");
const autoDrawBtn = document.getElementById("autoDrawBtn");

autoDrawBtn.addEventListener("click", async () => {
    const players = [];

const snapshot = await getDocs(collection(db, "players"));

snapshot.forEach((doc) => {
    players.push(doc.data());
});

// Shuffle Players
players.sort(() => Math.random() - 0.5);

// Show Groups

const groups = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Clear all groups
groups.forEach(group => {
    document.getElementById("group" + group).innerHTML = "";
});

// Put players into groups (4 players per group)
players.forEach((player, index) => {

    const groupIndex = Math.floor(index / 4);

    if (groupIndex < groups.length) {

        document.getElementById("group" + groups[groupIndex]).innerHTML +=
            "<div>" + player.playerName + "</div>";

    }

});
});
saveBtn.addEventListener("click", async () => {

  await setDoc(doc(db, "groupDraw", "current"), {
    groupA: document.getElementById("groupA").innerHTML,
    groupB: document.getElementById("groupB").innerHTML,
    groupC: document.getElementById("groupC").innerHTML,
    groupD: document.getElementById("groupD").innerHTML,
    groupE: document.getElementById("groupE").innerHTML,
    groupF: document.getElementById("groupF").innerHTML,
    groupG: document.getElementById("groupG").innerHTML,
    groupH: document.getElementById("groupH").innerHTML
  });

  alert("Group Draw Saved!");

});
async function loadSavedGroups() {

  const snap = await getDoc(doc(db, "groupDraw", "current"));

  if (!snap.exists()) return;

  const data = snap.data();

  document.getElementById("groupA").innerHTML = data.groupA || "";
  document.getElementById("groupB").innerHTML = data.groupB || "";
  document.getElementById("groupC").innerHTML = data.groupC || "";
  document.getElementById("groupD").innerHTML = data.groupD || "";
  document.getElementById("groupE").innerHTML = data.groupE || "";
  document.getElementById("groupF").innerHTML = data.groupF || "";
  document.getElementById("groupG").innerHTML = data.groupG || "";
  document.getElementById("groupH").innerHTML = data.groupH || "";

}
loadSavedGroups();
