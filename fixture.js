import { db } from "./firebase-config.js";
import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const generateBtn = document.getElementById("generateBtn");
const status = document.getElementById("status");

generateBtn.addEventListener("click", async () => {

  const snap = await getDoc(doc(db, "groupDraw", "current"));

  if (!snap.exists()) {
    status.innerHTML = "No Group Draw Found!";
    return;
  }

  const groups = snap.data();

  console.log(groups);

  status.innerHTML = "Group Draw Loaded Successfully";
});
