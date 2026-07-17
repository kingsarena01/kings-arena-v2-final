import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  collection,
  getDocs
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
