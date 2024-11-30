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
      const addedEventId = await addEvent({ name, date, location });
      alert(`Event added successfully! ID: ${addedEventId}`);
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
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", async () => {
            await handleDeleteEvent(event.id);
          });
          div.appendChild(deleteButton);
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

  async function handleDeleteEvent(eventId) {
    if (!eventId) {
      alert("Event ID is missing.");
      return;
    }

    try {
      await deleteEvent(eventId);
      alert("Event deleted successfully!");
      refreshEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Check console for details.");
    }
  }

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
      const addedGuestId = await addGuest(eventId, { name, rsvp });
      alert(`Guest added successfully! ID: ${addedGuestId}`);
      document.getElementById("addGuestForm").reset();
      refreshGuests(eventId);
    } catch (error) {
      console.error("Error adding guest:", error);
      alert("Failed to add guest. Check console for details.");
    }
  });

  // View Guests
  async function refreshGuests(eventId) {
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
          div.setAttribute("data-id", guest.id); // Attach the guest ID
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", async () => {
            await handleDeleteGuest(guest.id, eventId);
          });
          div.appendChild(deleteButton);
          guestsOutput.appendChild(div);
        });
      } else {
        guestsOutput.textContent = "No guests found for this event.";
      }
    } catch (error) {
      console.error("Error retrieving guests:", error);
      guestsOutput.textContent = "Failed to load guests.";
    }
  }

  document.getElementById("viewGuests").addEventListener("click", async () => {
    const eventId = document.getElementById("eventGuestsId").value.trim();
    await refreshGuests(eventId);
  });

  async function handleDeleteGuest(guestId, eventId) {
    if (!guestId) {
      alert("Guest ID is missing.");
      return;
    }

    try {
      await deleteGuest(guestId);
      alert("Guest deleted successfully!");
      refreshGuests(eventId);
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert("Failed to delete guest. Check console for details.");
    }
  }
});
