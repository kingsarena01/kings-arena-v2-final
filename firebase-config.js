import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1nT_EGGurjglHLGMeaM4I72cG0vw8ozU",
  authDomain: "kings-arena-tournament.firebaseapp.com",
  projectId: "kings-arena-tournament",
  storageBucket: "kings-arena-tournament.firebasestorage.app",
  messagingSenderId: "379530353311",
  appId: "1:379530353311:web:cd75e4b240a8d460fc60aa",
  measurementId: "G-BB2C6LK8HB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
