import {
  addEvent,
  getEventIds,
  addGuest,
  getGuestsByEvent,
  deleteEvent,
  deleteGuest,
} from "./crud.js";

document.addEventListener("DOMContentLoaded", () => {
  // Add Event
  document.getElementById("addEventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value.trim();
    const location = document.getElementById("eventLocation").value.trim();

    if (!name || !date || !location) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await addEvent({ name, date, location });
      alert("Event added successfully!");
      document.getElementById("addEventForm").reset();
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Check the console for details.");
    }
  });

  // View Events
  document.getElementById("viewEvents").addEventListener("click", async () => {
    const eventsOutput = document.getElementById("eventsOutput");
    eventsOutput.innerHTML = ""; // Clear output

    try {
      const events = await getEventIds();
      if (events.length > 0) {
        events.forEach((event) => {
          const div = document.createElement("div");
          div.textContent = `Event: ${event.name} (Date: ${event.date}, Location: ${event.location})`;
          eventsOutput.appendChild(div);
        });
      } else {
        eventsOutput.textContent = "No events found.";
      }
    } catch (error) {
      console.error("Error retrieving events:", error);
      eventsOutput.textContent = "Failed to load events.";
    }
  });

  // Add Guest
  document.getElementById("addGuestForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName").value.trim();
    const rsvp = document.getElementById("rsvpStatus").value === "true";
    const eventId = document.getElementById("eventId").value.trim();

    if (!name || !eventId) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await addGuest(eventId, { name, rsvp });
      alert("Guest added successfully!");
      document.getElementById("addGuestForm").reset();
    } catch (error) {
      console.error("Error adding guest:", error);
      alert("Failed to add guest. Check console for details.");
    }
  });

  // View Guests by Event
  document.getElementById("viewGuests").addEventListener("click", async () => {
    const eventId = document.getElementById("eventGuestsId").value.trim();
    const guestsOutput = document.getElementById("guestsOutput");
    guestsOutput.innerHTML = ""; // Clear output

    if (!eventId) {
      guestsOutput.textContent = "Please
