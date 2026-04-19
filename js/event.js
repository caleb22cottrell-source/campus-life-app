console.log("event.js connected!");

async function test() {
  const url = "https://api.allorigins.win/raw?url=" +
    encodeURIComponent("https://reinhardt.presence.io/events/cal");

  const res = await fetch(url);
  const text = await res.text();

  console.log("RAW FEED:");
  console.log(text);

  document.getElementById("events").innerText =
    text.slice(0, 1000);
}