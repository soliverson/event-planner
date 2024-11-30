// Import Firestore functions and Firestore database
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import db from "./firebase-config.js";

// ---------------------- CRUD for Events ----------------------

// Add a new event to the Events collection
export async function addEvent(event) {
  try {
    const docRef = await addDoc(collection(db, "Events"), event);
    console.log("Event added successfully with ID:", docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
}

// Retrieve all events with their document IDs
export async function getEventIds() {
  try {
    const events = [];
    const querySnapshot = await getDocs(collection(db, "Events"));
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    console.log("Retrieved events:", events);
    return events;
  } catch (error) {
    console.error("Error retrieving events:", error);
    throw error;
  }
}

// ---------------------- CRUD for Guests ----------------------

// Add a new guest to the Guests collection
export async function addGuest(eventId, guest) {
  try {
    const docRef = await addDoc(collection(db, "Guests"), { ...guest, eventId });
    console.log("Guest added successfully with ID:", docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error adding guest:", error);
    throw error;
  }
}

// Retrieve guests for a specific event by event ID
export async function getGuestsByEvent(eventId) {
  try {
    const guests = [];
    const q = query(collection(db, "Guests"), where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      guests.push({ id: doc.id, ...doc.data() });
    });
    console.log(`Retrieved guests for Event ID ${eventId}:`, guests);
    return guests;
  } catch (error) {
    console.error("Error retrieving guests for the event:", error);
    throw error;
  }
}
