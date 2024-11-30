import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  getDoc,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// CRUD for Events

// Delete an event
export async function deleteEvent(eventId) {
  try {
    console.log(`Attempting to delete event with ID: ${eventId}`); // Debug log
    const eventRef = doc(db, "Events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (!eventSnap.exists()) {
      console.error(`Event not found for deletion: ${eventId}`);
      return false;
    }

    await deleteDoc(eventRef);
    console.log(`Event deleted successfully: ${eventId}`); // Success log
    return true;
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error.message);
    throw error;
  }
}

// Delete a guest
export async function deleteGuest(guestId) {
  try {
    console.log(`Attempting to delete guest with ID: ${guestId}`); // Debug log
    const guestRef = doc(db, "Guests", guestId);
    const guestSnap = await getDoc(guestRef);

    if (!guestSnap.exists()) {
      console.error(`Guest not found for deletion: ${guestId}`);
      return false;
    }

    await deleteDoc(guestRef);
    console.log(`Guest deleted successfully: ${guestId}`); // Success log
    return true;
  } catch (error) {
    console.error(`Error deleting guest with ID ${guestId}:`, error.message);
    throw error;
  }
}
