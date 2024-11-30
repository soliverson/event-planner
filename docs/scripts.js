import {
  addEvent,
  getEventIds,
  addGuest,
  getGuestsByEvent,
} from "./crud.js";

// ---------------------- Add Event ----------------------
document.getElementById("addEventForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission
  const name = document.getElementById("eventName").value.trim();
  const date = document.getElementById("eventDate").value.trim();
  const location = document.getElementById("eventLocation").value.trim();

  if (!name || !date || !location) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  try {
    console.log("Adding event:", { name, date, location });
    await addEvent({ name, date, location });
    alert("Event added successfully!");
    document.getElementById("addEventForm").reset(); // Clear the form
  } catch (error) {
    console.error("Error adding event:", error);
    alert("Failed to add event. Check console for details.");
  }
});

// ---------------------- View Events ----------------------
document.getElementById("viewEvents").addEventListener("click", async () => {
  const eventsOutput = document.getElementById("eventsOutput");
  eventsOutput.innerHTML = ""; // Clear previous content

  try {
    console.log("Fetching events...");
    const events = await getEventIds();
    if (events && events.length > 0) {
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
    eventsOutput.textContent = "Failed to load events. Check console for details.";
  }
});

// ---------------------- Add Guest ----------------------
document.getElementById("addGuestForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent the default form submission
  const name = document.getElementById("guestName").value.trim();
  const rsvp = document.getElementById("rsvpStatus").value === "true";
  const eventId = document.getElementById("eventId").value.trim();

  if (!name || !eventId) {
    alert("Please fill in all fields before submitting.");
    return;
  }

  try {
    console.log("Adding guest:", { name, rsvp, eventId });
    await addGuest(eventId, { name, rsvp });
    alert("Guest added successfully!");
    document.getElementById("addGuestForm").reset(); // Clear the form
  } catch (error) {
    console.error("Error adding guest:", error);
    alert("Failed to add guest. Check console for details.");
  }
});

// ---------------------- View Guests by Event ----------------------
document.getElementById("viewGuests").addEventListener("click", async () => {
  const eventId = document.getElementById("eventGuestsId").value.trim();
  const guestsOutput = document.getElementById("guestsOutput");
  guestsOutput.innerHTML = ""; // Clear previous content

  if (!eventId) {
    guestsOutput.textContent = "Please enter an Event ID.";
    return;
  }

  try {
    console.log(`Fetching guests for Event ID: ${eventId}`);
    const guests = await getGuestsByEvent(eventId);
    if (guests && guests.length > 0) {
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
    guestsOutput.textContent = "Failed to load guests. Check console for details.";
  }
});
