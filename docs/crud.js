import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import db from "./firebase-config.js";

// Add a new guest to the Guests collection
export async function addGuest(eventId, guest) {
  try {
    const docRef = await addDoc(collection(db, "Guests"), { ...guest, eventId });
    console.log("Guest added successfully with ID:", docRef.id);
    return docRef.id;
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
    return guests;
  } catch (error) {
    console.error("Error retrieving guests:", error);
    throw error;
  }
}
