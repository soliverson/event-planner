import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import db from "./firebase-config";

// ---------------------- CRUD for Events ----------------------

// Add a new event to the Events collection
export async function addEvent(event) {
  console.log("Adding event to Firestore:", event); // Debug log
  try {
    const docRef = await addDoc(collection(db, "Events"), event);
    console.log("Event added successfully with ID:", docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error adding event:", error);
    throw error; // Rethrow error for handling in calling function
  }
}

// Retrieve all events with their document IDs
export async function getEventIds() {
  console.log("Fetching events from Firestore...");
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

// Update an event by ID
export async function updateEvent(eventId, updatedData) {
  console.log(`Updating event with ID ${eventId}:`, updatedData);
  try {
    const eventRef = doc(db, "Events", eventId);
    await updateDoc(eventRef, updatedData);
    console.log("Event updated successfully");
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

// Delete an event by ID
export async function deleteEvent(eventId) {
  console.log(`Deleting event with ID ${eventId}`);
  try {
    const eventRef = doc(db, "Events", eventId);
    await deleteDoc(eventRef);
    console.log("Event deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
}

// ---------------------- CRUD for Guests ----------------------

// Add a new guest to the Guests collection
export async function addGuest(eventId, guest) {
  console.log("Adding guest to Firestore:", { eventId, ...guest });
  try {
    const docRef = await addDoc(collection(db, "Guests"), { ...guest, eventId });
    console.log("Guest added successfully with ID:", docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error("Error adding guest:", error);
    throw error;
  }
}

// Retrieve all guests with their document IDs
export async function getGuestIds() {
  console.log("Fetching guests from Firestore...");
  try {
    const guests = [];
    const querySnapshot = await getDocs(collection(db, "Guests"));
    querySnapshot.forEach((doc) => {
      guests.push({ id: doc.id, ...doc.data() });
    });
    console.log("Retrieved guests:", guests);
    return guests;
  } catch (error) {
    console.error("Error retrieving guests:", error);
    throw error;
  }
}

// Retrieve guests for a specific event by event ID
export async function getGuestsByEvent(eventId) {
  console.log(`Fetching guests for Event ID ${eventId}`);
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

// Update a guest by ID
export async function updateGuest(guestId, updatedData) {
  console.log(`Updating guest with ID ${guestId}:`, updatedData);
  try {
    const guestRef = doc(db, "Guests", guestId);
    await updateDoc(guestRef, updatedData);
    console.log("Guest updated successfully");
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error;
  }
}

// Delete a guest by ID
export async function deleteGuest(guestId) {
  console.log(`Deleting guest with ID ${guestId}`);
  try {
    const guestRef = doc(db, "Guests", guestId);
    await deleteDoc(guestRef);
    console.log("Guest deleted successfully");
  } catch (error) {
    console.error("Error deleting guest:", error);
    throw error;
  }
}
