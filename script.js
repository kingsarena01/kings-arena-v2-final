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
document.getElementById("groupA").innerHTML = players[0] ? players[0].playerName : "";
document.getElementById("groupB").innerHTML = players[1] ? players[1].playerName : "";
document.getElementById("groupC").innerHTML = players[2] ? players[2].playerName : "";
document.getElementById("groupD").innerHTML = players[3] ? players[3].playerName : "";
});
