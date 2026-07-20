import { db } from "./firebase-config.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const list = document.getElementById("players-list");

const buttons = document.querySelectorAll("#group-buttons button");

let allPlayers = [];

async function loadPlayers() {

  const querySnapshot = await getDocs(collection(db, "players"));

  allPlayers = [];

  querySnapshot.forEach((doc) => {
    allPlayers.push(doc.data());
  });

}

function showGroup(group){

  list.innerHTML = "";

  const players = allPlayers.filter(p => p.group === group);

  if(players.length===0){
    list.innerHTML="<p>No players in this group.</p>";
    return;
  }

  players.forEach(player=>{

    list.innerHTML += `
      <div class="player-card">
        <img class="player-photo" src="${player.photoUrl}">
        <img class="team-logo" src="${player.teamLogoUrl}">
        <div class="player-name">${player.playerName}</div>
        <div class="team-name">${player.teamName}</div>
      </div>
    `;

  });

}

loadPlayers();

buttons.forEach(btn=>{

  btn.onclick=()=>{

    buttons.forEach(b=>b.classList.remove("active"));

    btn.classList.add("active");

    showGroup(btn.dataset.group);

  }

});
