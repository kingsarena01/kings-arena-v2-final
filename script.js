import { db } from "./firebase-config.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

console.log("King's Arena Website Loaded");
alert("Script Loaded");
const tournamentSelect = document.getElementById("tournamentSelect");

async function loadTournaments() {
  try {
    tournamentSelect.innerHTML =
      '<option value="">Select Tournament</option>';

    const snapshot = await getDocs(collection(db, "tournament"));

    snapshot.forEach((doc) => {
      const data = doc.data();

      const option = document.createElement("option");
      option.value = doc.id;
      option.textContent =
        data.tournamentName ||
        data.name ||
        data.season ||
        doc.id;

      tournamentSelect.appendChild(option);
    });

    console.log("Tournament Loaded");
  } catch (error) {
    console.error("Error:", error);
    alert(error.message);
  }
}

loadTournaments();
