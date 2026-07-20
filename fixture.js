import { db } from "./firebase-config.js";

import {
  doc,
  getDoc,
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

    const snap = await getDoc(doc(db, "groupDraw", "current"));

    if (!snap.exists()) {

        if(status){
            status.innerHTML = "No Group Draw Found!";
        }

        return;
    }

    const groups = snap.data();
    const fixtures = [];

    for (const groupName in groups) {

        const players = groups[groupName]
            .replace(/<[^>]*>/g, "\n")
            .split("\n")
            .map(p => p.trim())
            .filter(p => p);

        if (players.length !== 4) continue;

        // Round 1
fixtures.push({
    group: groupName,
    round: 1,
    home: players[0],
    away: players[1]
});

fixtures.push({
    group: groupName,
    round: 1,
    home: players[2],
    away: players[3]
});

        // Round 2
fixtures.push({
    group: groupName,
    round: 2,
    home: players[0],
    away: players[2]
});

fixtures.push({
    group: groupName,
    round: 2,
    home: players[1],
    away: players[3]
});

// Round 3
fixtures.push({
    group: groupName,
    round: 3,
    home: players[0],
    away: players[3]
});

fixtures.push({
    group: groupName,
    round: 3,
    home: players[1],
    away: players[2]
});
    }

    await setDoc(doc(db, "fixtures", "current"), {
        matches: fixtures
    });

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
