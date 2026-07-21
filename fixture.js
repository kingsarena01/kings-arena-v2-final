import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// =============================
// Elements
// =============================

const generateBtn = document.getElementById("generateBtn");
const status = document.getElementById("status");
const fixtureList = document.getElementById("fixtureList");

// =============================
// Generate Fixtures
// =============================

if (generateBtn) {

generateBtn.addEventListener("click", async () => {
console.log("db =", db);
console.log("Generate button clicked");
alert("Generate clicked");
    const snap = await getDoc(doc(db, "groupDraw", "current"));

    if (!snap.exists()) {

        if(status){
            status.innerHTML = "No Group Draw Found!";
        }

        return;
    }

    const groups = snap.data();
    const fixtures = [];

const playerSnap = await getDocs(collection(db, "players"));

const playersMap = {};

playerSnap.forEach(doc => {
    const p = doc.data();
    alert(JSON.stringify(p));
    playersMap[p.playerName.trim()] = p;
});

for (const groupName in groups) {

    const players = groups[groupName]
        .replace(/<[^>]*>/g, "\n")
        .split("\n")
        .map(p => p.replace(/\r/g, "").trim())
        .filter(p => p);

        if (players.length !== 4) continue;

        // Round 1
fixtures.push({
    group: groupName,
    round: 1,
    home: playersMap[players[0]],
    away: playersMap[players[1]]
});

fixtures.push({
    group: groupName,
    round: 1,
    home: playersMap[players[2]],
    away: playersMap[players[3]]
});

        // Round 2
fixtures.push({
    group: groupName,
    round: 2,
    home: playersMap[players[0]],
    away: playersMap[players[2]]
    
});

fixtures.push({
    group: groupName,
    round: 2,
    home: playersMap[players[1]],
    away: playersMap[players[3]]
});

// Round 3
fixtures.push({
    group: groupName,
    round: 3,
    home: playersMap[players[0]],
    away: playersMap[players[3]]
});

fixtures.push({
    group: groupName,
    round: 3,
    home: playersMap[players[1]],
    away: playersMap[players[2]]
});
    }

    await setDoc(doc(db, "fixtures", "current"), {
        matches: fixtures
    });
console.log(fixtures);
alert(JSON.stringify(fixtures[0], null, 2));
    if(status){
        status.innerHTML =
        "Round 1, Round 2 & Round 3 Fixtures Generated Successfully!";
    }

});
          } 
// =============================
// Load Fixtures
// =============================

async function loadFixtures(round = "all") {

    if (!fixtureList) return;

    const snap = await getDoc(doc(db, "fixtures", "current"));

    if (!snap.exists()) {
        fixtureList.innerHTML = "<p>No Fixtures Found</p>";
        return;
    }

    const matches = snap.data().matches;

    fixtureList.innerHTML = "";

    matches.forEach(match => {

        if (round !== "all" && match.round !== Number(round)) {
            return;
        }

        fixtureList.innerHTML += `
<div class="fixture-card">

    <div class="fixture-top">
        <span>${match.group}</span>
        <span>Round ${match.round}</span>
    </div>

    <div class="fixture-body">

        <div class="team">
    <div class="player-photo">
        <img src="${match.home.photoUrl || 'images/default-player.png'}" alt="${match.home.playerName}">
        <img class="team-logo" src="${match.home.teamLogoUrl || 'images/default-team.png'}" alt="${match.home.teamName}">
    </div>

    <div class="player-name">${match.home.playerName}</div>
    <div class="team-name">${match.home.teamName}</div>
</div>

        <div class="vs">
    <div class="match-status">UPCOMING</div>
    <div class="score">0 - 0</div>
</div>
        <div class="team">
    <div class="player-photo">
        <img src="${match.away.photoUrl || 'images/default-player.png'}" alt="${match.away.playerName}">
        <img class="team-logo" src="${match.away.teamLogoUrl || 'images/default-team.png'}" alt="${match.away.teamName}">
    </div>

    <div class="player-name">${match.away.playerName}</div>
    <div class="team-name">${match.away.teamName}</div>
</div>

    </div>

</div>
`;
    });

}

// =============================
// Round Filter
// =============================

const filterButtons = document.querySelectorAll(".mode-switch a");

if (filterButtons.length > 0) {

    filterButtons.forEach(btn => {

        btn.addEventListener("click", e => {

            e.preventDefault();

            filterButtons.forEach(button =>
                button.classList.remove("active")
            );

            btn.classList.add("active");

            const round = btn.dataset.round || "all";

            loadFixtures(round);

        });

    });

}

// =============================
// Auto Load
// =============================

loadFixtures();
