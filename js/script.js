console.log("script.js connected 🚀");

// =========================
// 🍽️ DINING SCHEDULE
// =========================
const meals = [
  { name: "Breakfast", start: "07:00", end: "10:00" },
  { name: "Lunch", start: "11:30", end: "14:00" },
  { name: "Dinner", start: "17:00", end: "20:00" }
];

// =========================
// 📅 EVENTS DATA
// =========================
const eventsData = [
  { title: "Basketball Open Gym", datetime: "2026-04-22T18:00:00" },
  { title: "Coding Club Hack Night", datetime: "2026-04-23T19:00:00" },
  { title: "Spring Career Fair", datetime: "2026-04-25T10:00:00" },
  { title: "Movie Night: Spider-Man", datetime: "2026-04-26T20:00:00" }
];

// =========================
// ⏱️ HELPERS
// =========================
function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function nowMinutes() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}

function formatDuration(ms) {
  const s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  }
  return `${hours}h ${mins}m ${secs}s`;
}

// =========================
// 🍽️ DINING TIMER
// =========================
function updateDining() {
  const el = document.getElementById("mealStatus");
  if (!el) return;

  const now = nowMinutes();

  const current = meals.find(m =>
    now >= toMinutes(m.start) && now < toMinutes(m.end)
  );

  const next = meals.find(m =>
    toMinutes(m.start) > now
  );

  if (current) {
    const left = toMinutes(current.end) - now;

    el.innerHTML = `
      <div><strong>${current.name}</strong> is OPEN</div>
      <div>Closes in ${left} min</div>
    `;
    return;
  }

  if (next) {
    const until = toMinutes(next.start) - now;

    el.innerHTML = `
      <div><strong>${next.name}</strong> next</div>
      <div>Opens in ${until} min</div>
    `;
    return;
  }

  const tomorrow = toMinutes(meals[0].start) + 1440;
  const until = tomorrow - now;

  el.innerHTML = `
    <div><strong>Dining Closed</strong></div>
    <div>Breakfast in ${until} min</div>
  `;
}

// =========================
// 📅 EVENT TIMER
// =========================
function getNextEvent() {
  const now = new Date();

  const upcoming = eventsData
    .map(e => ({
      ...e,
      time: new Date(e.datetime)
    }))
    .filter(e => e.time > now)
    .sort((a, b) => a.time - b.time);

  return upcoming[0] || null;
}

function updateEvent() {
  const titleEl = document.getElementById("next-event-title");
  const countdownEl = document.getElementById("countdown");

  if (!titleEl || !countdownEl) return;

  const event = getNextEvent();

  if (!event) {
    titleEl.innerText = "No upcoming events";
    countdownEl.innerText = "";
    return;
  }

  titleEl.innerText = event.title;

  const diff = new Date(event.datetime).getTime() - Date.now();

  if (diff <= 0) {
    countdownEl.innerText = "Happening now!";
    return;
  }

  countdownEl.innerText = formatDuration(diff);
}

// =========================
// 🔁 MASTER LOOP
// =========================
function updateAll() {
  updateDining();
  updateEvent();
}

// start
updateAll();
setInterval(updateAll, 1000);