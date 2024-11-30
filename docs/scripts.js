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
      refreshEvents();
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Check the console for details.");
    }
  });

  // View Events
  async function refreshEvents() {
    const eventsOutput = document.getElementById("eventsOutput");
    eventsOutput.innerHTML = ""; // Clear output

    try {
      const events = await getEventIds();
      if (events.length > 0) {
        events.forEach((event) => {
          const div = document.createElement("div");
          div.textContent = `Event: ${event.name} (Date: ${event.date}, Location: ${event.location})`;
          div.setAttribute("data-id", event.id); // Attach the event ID
          eventsOutput.appendChild(div);
        });
      } else {
        eventsOutput.textContent = "No events found.";
      }
    } catch (error) {
      console.error("Error retrieving events:", error);
      eventsOutput.textContent = "Failed to load events.";
    }
  }

  document.getElementById("viewEvents").addEventListener("click", refreshEvents);

  // Delete Event
  document.getElementById("deleteEvent").addEventListener("click", async () => {
    const eventId = document.getElementById("deleteEventId").value.trim();
    if (!eventId) {
      alert("Please enter an Event ID to delete.");
      return;
    }

    try {
      await deleteEvent(eventId);
      alert("Event deleted successfully!");
      document.getElementById("deleteEventId").value = ""; // Clear input
      refreshEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Check console for details.");
    }
  });

  // Delete Guest
  document.getElementById("deleteGuest").addEventListener("click", async () => {
    const guestId = document.getElementById("deleteGuestId").value.trim();
    const eventId = document.getElementById("eventGuestsId").value.trim();
    if (!guestId) {
      alert("Please enter a Guest ID to delete.");
      return;
    }

    try {
      await deleteGuest(guestId);
      alert("Guest deleted successfully!");
      document.getElementById("deleteGuestId").value = ""; // Clear input
      refreshGuests(eventId);
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert("Failed to delete guest. Check console for details.");
    }
  });
});
