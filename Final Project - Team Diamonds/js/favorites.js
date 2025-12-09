$(document).ready(function() {
  const loggedIn = localStorage.getItem("loggedIn");
  const username = localStorage.getItem("username");

  // If not logged in
  if (!loggedIn) {
    $("#favorites-container").html("<p>Please log in to view your saved events.</p>");
    return; // stop here
  }

  // Show greeting
  $("#favorites-header").html(
    username ? `<h2>${username}'s Saved Events</h2>` : "<h2>Your Saved Events</h2>"
  );

  // --- Initial render ---
  const favorites = getFavorites(); // uses shared helper
  if (favorites.length === 0) {
    $("#favorites-container").html("<p>You haven't saved any events yet.</p>");
    return;
  }

  $.getJSON("../Data/eventsdemo.json")
    .done(function(data) {
      renderFavorites(data, favorites);
    })
    .fail(function() {
      $("#favorites-container").html("<p>Could not load favorites data.</p>");
    });

  // --- Render favorites list ---
  function renderFavorites(data, favorites) {
    $("#favorites-container").empty();
    if (favorites.length === 0) {
      $("#favorites-container").html("<p>You haven't saved any events yet.</p>");
      return;
    }
    favorites.forEach(id => {
      const event = data.find(e => String(e.id) === id);
      if (event) {
        $("#favorites-container").append(`
          <div class="card" data-id="${event.id}">
            <img src="${event.image || 'default.jpg'}" alt="${event.title}">
            <div class="card-content">
              <h3>${event.title}</h3>
              <p>${event.date} @ ${event.location}</p>
              <p>${event.category}</p>
              <button class="fav-btn saved" data-id="${event.id}">Saved! 🎉</button>
            </div>
          </div>
        `);
      }
    });
  }
});
