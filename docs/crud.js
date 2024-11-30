import db from "./firebase-config.js"; // Use the default export

import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Add Event
export async function addEvent(event) {
  const docRef = await addDoc(collection(db, "Events"), event);
  console.log("Event added successfully:", docRef.id);
  return docRef.id;
}

// Get Events
export async function getEventIds() {
  const events = [];
  const querySnapshot = await getDocs(collection(db, "Events"));
  querySnapshot.forEach((doc) => {
    events.push({ id: doc.id, ...doc.data() });
  });
  return events;
}

// Delete Event
export async function deleteEvent(eventId) {
  const eventRef = doc(db, "Events", eventId);
  await deleteDoc(eventRef);
  console.log("Event deleted successfully:", eventId);
}

// Add Guest
export async function addGuest(eventId, guest) {
  const docRef = await addDoc(collection(db, "Guests"), { ...guest, eventId });
  console.log("Guest added successfully:", docRef.id);
  return docRef.id;
}

// Get Guests by Event
export async function getGuestsByEvent(eventId) {
  const guests = [];
  const q = query(collection(db, "Guests"), where("eventId", "==", eventId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    guests.push({ id: doc.id, ...doc.data() });
  });
  return guests;
}

// Delete Guest
export async function deleteGuest(guestId) {
  const guestRef = doc(db, "Guests", guestId);
  await deleteDoc(guestRef);
  console.log("Guest deleted successfully:", guestId);
}
