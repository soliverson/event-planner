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
  
  // Add a new event
  export async function addEvent(event) {
    try {
      const docRef = await addDoc(collection(db, "Events"), event);
      console.log("Event added with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding event: ", e);
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
      console.log("Events with IDs:", events);
      return events;
    } catch (e) {
      console.error("Error retrieving events:", e);
    }
  }
  
  // Update an event by ID
  export async function updateEvent(eventId, updatedData) {
    try {
      const eventRef = doc(db, "Events", eventId);
      await updateDoc(eventRef, updatedData);
      console.log("Event updated");
    } catch (e) {
      console.error("Error updating event: ", e);
    }
  }
  
  // Delete an event by ID
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
  
  // Retrieve all guests with their document IDs
  export async function getGuestIds() {
    try {
      const guests = [];
      const querySnapshot = await getDocs(collection(db, "Guests"));
      querySnapshot.forEach((doc) => {
        guests.push({ id: doc.id, ...doc.data() });
      });
      console.log("Guests with IDs:", guests);
      return guests;
    } catch (e) {
      console.error("Error retrieving guests:", e);
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
      console.log(`Guests for Event ID ${eventId}:`, guests);
      return guests;
    } catch (e) {
      console.error("Error retrieving guests for the event:", e);
    }
  }
  
  // Update a guest by ID
  export async function updateGuest(guestId, updatedData) {
    try {
      const guestRef = doc(db, "Guests", guestId);
      await updateDoc(guestRef, updatedData);
      console.log("Guest updated");
    } catch (e) {
      console.error("Error updating guest: ", e);
    }
  }
  
  // Delete a guest by ID
  export async function deleteGuest(guestId) {
    try {
      const guestRef = doc(db, "Guests", guestId);
      await deleteDoc(guestRef);
      console.log("Guest deleted");
    } catch (e) {
      console.error("Error deleting guest: ", e);
    }
  }
  