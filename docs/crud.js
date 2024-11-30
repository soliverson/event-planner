import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { db } from "./firebase-config.js";

// Add a new event
export async function addEvent(event) {
  try {
    const docRef = await addDoc(collection(db, "Events"), event);
    console.log("Event added successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
}

// Retrieve all events
export async function getEvents() {
  try {
    const events = [];
    const querySnapshot = await getDocs(collection(db, "Events"));
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return events;
  } catch (error) {
    console.error("Error retrieving events:", error);
    throw error;
  }
}
