import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
const generateBtn = document.getElementById("generateBtn");
const status = document.getElementById("status");

generateBtn.addEventListener("click", async () => {

  const snap = await getDoc(doc(db, "groupDraw", "current"));

  if (!snap.exists()) {
    status.innerHTML = "No Group Draw Found!";
    return;
  }
const fixtures = [];
  const groups = snap.data();
for (const groupName in groups) {

    const players = groups[groupName]
        .replace(/<[^>]*>/g, "\n")
        .split("\n")
        .map(p => p.trim())
        .filter(p => p);

    if (players.length !== 4) continue;

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
  console.log(groups);
await setDoc(doc(db, "fixtures", "current"), {
    matches: fixtures
});

status.innerHTML = "Round 1 Fixtures Generated Successfully!";

});
