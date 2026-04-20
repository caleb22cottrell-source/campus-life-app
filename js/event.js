console.log("event.js connected!");

// Fake API data (pretend this came from a server)
const eventsData = [
  {
    title: "Basketball Open Gym",
    date: "April 22, 2026",
    time: "6:00 PM",
    location: "Main Gym"
  },
  {
    title: "Coding Club Hack Night",
    date: "April 23, 2026",
    time: "7:00 PM",
    location: "Tech Building Room 204"
  },
  {
    title: "Spring Career Fair",
    date: "April 25, 2026",
    time: "10:00 AM",
    location: "Student Center"
  },
  {
    title: "Movie Night: Spider-Man",
    date: "April 26, 2026",
    time: "8:00 PM",
    location: "Auditorium"
  }
];

// Render events
function displayEvents(events) {
  const list = document.getElementById("events-list");
  list.innerHTML = "";

  if (events.length === 0) {
    list.innerHTML = "<p>No events found.</p>";
    return;
  }

  events.forEach(event => {
    list.innerHTML += `
      <div class="card p-3 mb-2">
        <h5>${event.title}</h5>
        <p>${event.date} | ${event.time} | ${event.location}</p>
      </div>
    `;
  });
}

// Fake API call simulation
function fetchEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventsData);
    }, 500); // simulate network delay
  });
}

// Search function
document.getElementById("search").addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  const filtered = eventsData.filter(event =>
    event.title.toLowerCase().includes(query) ||
    event.location.toLowerCase().includes(query)
  );

  displayEvents(filtered);
});

// Load on page start
fetchEvents().then(data => {
  displayEvents(data);
});