function saveFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to favorites!");
  } else {
    alert("Already in favorites.");
  }
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function removeFavorite(id) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter(f => f !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter(f => f !== id); // remove
  } else {
    favorites.push(id); // add
  }
  saveFavorites(favorites);
  return favorites.includes(id); // return new state
}

