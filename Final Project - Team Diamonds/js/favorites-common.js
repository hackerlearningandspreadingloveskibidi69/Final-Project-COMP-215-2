// favorites-common.js
// Shared helpers and toggle handler for favorites across events.html and favorites.html

function getFavoritesKey() {
  const username = localStorage.getItem("username");
  return username ? `favorites_${username}` : "favorites_guest";
}

function getFavorites() {
  return JSON.parse(localStorage.getItem(getFavoritesKey())) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem(getFavoritesKey(), JSON.stringify(favorites));
}

function toggleFavorite(id) {
  id = String(id);
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id);
    saveFavorites(favorites);
    return false; // unsaved
  } else {
    favorites.push(id);
    saveFavorites(favorites);
    return true; // saved
  }
}

// --- Global toggle handler ---
// Works for both events page and favorites page
$(document).on("click", ".fav-btn", function() {
  const id = String($(this).data("id"));
  const nowSaved = toggleFavorite(id);

  if (nowSaved) {
    $(this).addClass("saved").text("Saved! 🎉");
  } else {
    $(this).removeClass("saved").text("Save");

    // If on favorites page, remove the card immediately
    $(`#favorites-container .card[data-id="${id}"]`).remove();
    if (getFavorites().length === 0) {
      $("#favorites-container").html("<p>You haven't saved any events yet.</p>");
    }
  }
});
