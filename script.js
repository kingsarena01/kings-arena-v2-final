import { db } from "./firebase-config.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
console.log("King's Arena Website Loaded");
console.log("Group Draw Loaded");
const tournamentSelect = document.getElementById("tournamentSelect");
async function loadTournaments() {
    const snapshot = await getDocs(collection(db, "tournaments"));
    console.log(snapshot);
}

loadTournaments();
