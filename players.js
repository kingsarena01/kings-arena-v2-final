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

    <div class="player-images">
        <img class="player-photo" src="${player.photoUrl}" alt="">
        <img class="team-logo" src="${player.teamLogoUrl}" alt="">
    </div>

    <div class="player-name">${player.playerName}</div>

    <div class="team-name">
        ${player.teamName}
    </div>

    <a class="telegram-btn"
       href="https://t.me/${player.telegram.replace("@","")}"
       target="_blank">
       Message on Telegram
    </a>

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
