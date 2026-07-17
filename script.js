import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
