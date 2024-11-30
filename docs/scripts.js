import { addEvent, getEvents, addGuest, getGuestsByEvent } from "./crud.js";

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
      alert("Failed to add guest. Check the console for details.");
    }
  });

  // View Guests by Event
  document.getElementById("viewGuests").addEventListener("click", async () => {
    const eventId = document.getElementById("eventGuestsId").value.trim();
    const guestsOutput = document.getElementById("guestsOutput");
    guestsOutput.innerHTML = ""; // Clear output

    if (!eventId) {
      guestsOutput.textContent = "Please enter an Event ID.";
      return;
    }

    try {
      const guests = await getGuestsByEvent(eventId);
      if (guests.length > 0) {
        guests.forEach((guest) => {
          const div = document.createElement("div");
          div.textContent = `Guest: ${guest.name} (RSVP: ${guest.rsvp ? "Yes" : "No"})`;
          guestsOutput.appendChild(div);
        });
      } else {
        guestsOutput.textContent = "No guests found for this event.";
      }
    } catch (error) {
      console.error("Error retrieving guests:", error);
      guestsOutput.textContent = "Failed to load guests.";
    }
  });
});
