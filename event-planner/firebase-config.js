// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVW6kkkQ8xn8x3cYe_BmvBa78v_qeW1H8",
  authDomain: "event-planner-b35e7.firebaseapp.com",
  projectId: "event-planner-b35e7",
  storageBucket: "event-planner-b35e7.appspot.com",
  messagingSenderId: "940381941062",
  appId: "1:940381941062:web:ca6cbd964b23e5ba614947",
  measurementId: "G-1Y9JWMCT5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export default db;
// Import Firestore functions and the initialized `db`
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import db from "./firebase-config";

// ---------------------- CRUD for Events ----------------------

// Add a new event
export async function addEvent(event) {
  try {
    const docRef = await addDoc(collection(db, "Events"), event);
    console.log("Event added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding event: ", e);
  }
}

// Retrieve all events
export async function getEvents() {
  try {
    const querySnapshot = await getDocs(collection(db, "Events"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (e) {
    console.error("Error retrieving events: ", e);
  }
}

// Update an event
export async function updateEvent(eventId, updatedData) {
  try {
    const eventRef = doc(db, "Events", eventId);
    await updateDoc(eventRef, updatedData);
    console.log("Event updated");
  } catch (e) {
    console.error("Error updating event: ", e);
  }
}

// Delete an event
export async function deleteEvent(eventId) {
  try {
    const eventRef = doc(db, "Events", eventId);
    await deleteDoc(eventRef);
    console.log("Event deleted");
  } catch (e) {
    console.error("Error deleting event: ", e);
  }
}

// ---------------------- CRUD for Guests ----------------------

// Add a new guest to an event
export async function addGuest(eventId, guest) {
  try {
    const docRef = await addDoc(collection(db, "Guests"), { ...guest, eventId });
    console.log("Guest added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding guest: ", e);
  }
}

// Retrieve guests for a specific event
export async function getGuests(eventId) {
  try {
    const q = query(collection(db, "Guests"), where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (e) {
    console.error("Error retrieving guests: ", e);
  }
}
