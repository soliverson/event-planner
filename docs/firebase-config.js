// Import the functions you need from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVW6kkkQ8xn8x3cYe_BmvBa78v_qeW1H8",
  authDomain: "event-planner-b35e7.firebaseapp.com",
  projectId: "event-planner-b35e7",
  storageBucket: "event-planner-b35e7.appspot.com",
  messagingSenderId: "940381941062",
  appId: "1:940381941062:web:ca6cbd964b23e5ba614947",
  measurementId: "G-1Y9JWMCT5P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
