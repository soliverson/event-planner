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
      document.getElementById("viewEvents").click(); // Refresh the events list
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
          div.innerHTML = `Event: ${event.name} (Date: ${event.date}, Location: ${event.location}) 
          <button class="delete-event" data-id="${event.id}">Delete</button>`;
          eventsOutput.appendChild(div);
        });

        // Add delete event functionality
        document.querySelectorAll(".delete-event").forEach((button) => {
          button.addEventListener("click", async () => {
            const eventId = button.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this event?")) {
              try {
                await deleteEvent(eventId);
                alert("Event deleted successfully!");
                button.parentElement.remove();
              } catch (error) {
                console.error("Error deleting event:", error);
                alert("Failed to delete event. Check console for details.");
              }
            }
          });
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
      guestsOutput.textContent = "Please enter an Event ID.";
      return;
    }

    try {
      const guests = await getGuestsByEvent(eventId);
      if (guests.length > 0) {
        guests.forEach((guest) => {
          const div = document.createElement("div");
          div.innerHTML = `Guest: ${guest.name} (RSVP: ${guest.rsvp ? "Yes" : "No"}) 
          <button class="delete-guest" data-id="${guest.id}">Delete</button>`;
          guestsOutput.appendChild(div);
        });

        // Add delete guest functionality
        document.querySelectorAll(".delete-guest").forEach((button) => {
          button.addEventListener("click", async () => {
            const guestId = button.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this guest?")) {
              try {
                await deleteGuest(guestId);
                alert("Guest deleted successfully!");
                button.parentElement.remove();
              } catch (error) {
                console.error("Error deleting guest:", error);
                alert("Failed to delete guest. Check console for details.");
              }
            }
          });
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
