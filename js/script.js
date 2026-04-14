console.log("script.js connected!");


// RSVP button interaction
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".rsvp-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("You have RSVP'd!");
    });
  });
});

// API for dining options, events, and map locations would go here. For now, we can use placeholders.