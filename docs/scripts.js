// Delete Event
document.getElementById("deleteEvent").addEventListener("click", async () => {
  const eventId = document.getElementById("deleteEventId").value.trim();
  console.log(`Delete Event Button Clicked. Event ID: ${eventId}`); // Debug log

  if (!eventId) {
    alert("Please enter an Event ID to delete.");
    return;
  }

  try {
    const success = await deleteEvent(eventId);
    if (success) {
      alert(`Event deleted successfully! ID: ${eventId}`);
      refreshEvents();
    } else {
      alert(`Event not found. Please check the ID: ${eventId}`);
    }
    document.getElementById("deleteEventId").value = ""; // Clear input
  } catch (error) {
    console.error(`Error deleting event with ID ${eventId}:`, error);
    alert("Failed to delete event. Check console for details.");
  }
});

// Delete Guest
document.getElementById("deleteGuest").addEventListener("click", async () => {
  const guestId = document.getElementById("deleteGuestId").value.trim();
  const eventId = document.getElementById("eventGuestsId").value.trim(); // For refreshing guests list
  console.log(`Delete Guest Button Clicked. Guest ID: ${guestId}, Event ID: ${eventId}`); // Debug log

  if (!guestId) {
    alert("Please enter a Guest ID to delete.");
    return;
  }

  try {
    const success = await deleteGuest(guestId);
    if (success) {
      alert(`Guest deleted successfully! ID: ${guestId}`);
      if (eventId) refreshGuests(eventId);
    } else {
      alert(`Guest not found. Please check the ID: ${guestId}`);
    }
    document.getElementById("deleteGuestId").value = ""; // Clear input
  } catch (error) {
    console.error(`Error deleting guest with ID ${guestId}:`, error);
    alert("Failed to delete guest. Check console for details.");
  }
});
