document.getElementById("deleteEvent").addEventListener("click", async () => {
  const eventId = document.getElementById("deleteEventId").value.trim();
  if (!eventId) {
    alert("Please enter an Event ID to delete.");
    return;
  }

  try {
    const success = await deleteEvent(eventId);
    if (success) {
      alert("Event deleted successfully!");
      refreshEvents(); // Refresh events after deletion
    } else {
      alert("Event not found. Please check the Event ID.");
    }
    document.getElementById("deleteEventId").value = ""; // Clear input
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Failed to delete event. Check console for details.");
  }
});

document.getElementById("deleteGuest").addEventListener("click", async () => {
  const guestId = document.getElementById("deleteGuestId").value.trim();
  const eventId = document.getElementById("eventGuestsId").value.trim(); // For refreshing guests list
  if (!guestId) {
    alert("Please enter a Guest ID to delete.");
    return;
  }

  try {
    const success = await deleteGuest(guestId);
    if (success) {
      alert("Guest deleted successfully!");
      if (eventId) await refreshGuests(eventId); // Refresh guests if event ID is available
    } else {
      alert("Guest not found. Please check the Guest ID.");
    }
    document.getElementById("deleteGuestId").value = ""; // Clear input
  } catch (error) {
    console.error("Error deleting guest:", error);
    alert("Failed to delete guest. Check console for details.");
  }
});
