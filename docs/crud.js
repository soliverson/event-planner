import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// ---------------------- CRUD for Events ----------------------

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
export async function getEventIds() {
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

// Delete an event
export async function deleteEvent(eventId) {
  try {
    const eventRef = doc(db, "Events", eventId);
    await deleteDoc(eventRef);
    console.log("Event deleted successfully:", eventId);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

// ---------------------- CRUD for Guests ----------------------

// Add a new guest
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

// Retrieve guests by event
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
    console.error("Error retrieving guests for event:", error);
    throw error;
  }
}

// Delete a guest
export async function deleteGuest(guestId) {
  try {
    const guestRef = doc(db, "Guests", guestId);
    await deleteDoc(guestRef);
    console.log("Guest deleted successfully:", guestId);
  } catch (error) {
    console.error("Error deleting guest:", error);
    throw error;
  }
}
