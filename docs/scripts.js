import {
  addEvent,
  getEventIds,
  addGuest,
  getGuestsByEvent,
  deleteEvent,
  deleteGuest,
} from "./crud.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("addEventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value.trim();
    const location = document.getElementById("eventLocation").value.trim();
    if (!name || !date || !location) return alert("Fill in all fields.");
    await addEvent({ name, date, location });
    alert("Event added successfully!");
  });

  document.getElementById("viewEvents").addEventListener("click", async () => {
    const events = await getEventIds();
    const eventsOutput = document.getElementById("eventsOutput");
    eventsOutput.innerHTML = events.length
      ? events.map(e => `<div>${e.name} (${e.date} - ${e.location})</div>`).join("")
      : "No events found.";
  });

  document.getElementById("addGuestForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("guestName").value.trim();
    const rsvp = document.getElementById("rsvpStatus").value === "true";
    const eventId = document.getElementById("eventId").value.trim();
    if (!name || !eventId) return alert("Fill in all fields.");
    await addGuest(eventId, { name, rsvp });
    alert("Guest added successfully!");
  });

  document.getElementById("viewGuests").addEventListener("click", async () => {
    const eventId = document.getElementById("eventGuestsId").value.trim();
    const guests = await getGuestsByEvent(eventId);
    const guestsOutput = document.getElementById("guestsOutput");
    guestsOutput.innerHTML = guests.length
      ? guests.map(g => `<div>${g.name} (RSVP: ${g.rsvp ? "Yes" : "No"})</div>`).join("")
      : "No guests found.";
  });

  document.getElementById("deleteEvent").addEventListener("click", async () => {
    const eventId = document.getElementById("deleteEventId").value.trim();
    if (!eventId) return alert("Provide an Event ID.");
    await deleteEvent(eventId);
    alert("Event deleted.");
  });

  document.getElementById("deleteGuest").addEventListener("click", async () => {
    const guestId = document.getElementById("deleteGuestId").value.trim();
    if (!guestId) return alert("Provide a Guest ID.");
    await deleteGuest(guestId);
    alert("Guest deleted.");
  });
});
