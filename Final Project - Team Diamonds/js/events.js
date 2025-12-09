$(document).ready(function() {
  const EVENTS_JSON = "../Data/eventsdemo.json";
  let eventsData = [];
  let selectedIndex = -1;
  const selectedCategories = new Set();

  // --- Load events ---
  $.getJSON(EVENTS_JSON)
    .done(function(data) {
      eventsData = data;
      filterAndSortEvents(); // initial render
      bindHandlers();
    })
    .fail(function() {
      $("#events").html("<p>Failed to load events.</p>");
    });

  // --- Render events ---
  function renderEvents(events) {
    $("#events").empty();
    const favorites = getFavorites(); // uses shared helper
    if (events.length === 0) {
      $("#events").html("<p>No events found.</p>");
      return;
    }
    events.forEach(event => {
      const isSaved = favorites.includes(String(event.id));
      $("#events").append(`
        <div class="event-card card" data-id="${event.id}">
          <img src="${event.image || 'default.jpg'}" alt="${event.title}">
          <div class="card-content">
            <h3>${event.title}</h3>
            <p>${event.date} @ ${event.location}</p>
            <p>${event.category}</p>
            <button class="fav-btn ${isSaved ? 'saved' : ''}" data-id="${event.id}">
              ${isSaved ? 'Saved! 🎉' : 'Save'}
            </button>
          </div>
        </div>
      `);
    });
    renderFavoritesSection(); // keep favorites section in sync
  }

  // --- Filter + sort logic ---
  function filterAndSortEvents() {
    const categories = Array.from(selectedCategories);
    const sortOrder = $("#sort").val();

    let filtered = eventsData.filter(e => {
      return categories.length === 0 || categories.includes(e.category);
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "dateAsc" ? dateA - dateB : dateB - dateA;
    });

    renderEvents(filtered);
  }

  // --- Render favorites section live ---
  function renderFavoritesSection() {
    const favorites = getFavorites(); // uses shared helper
    $("#favorites-container").empty();

    if (favorites.length === 0) {
      $("#favorites-container").html("<p>You haven't saved any events yet.</p>");
      return;
    }

    favorites.forEach(id => {
      const event = eventsData.find(e => String(e.id) === id);
      if (event) {
        const isSaved = favorites.includes(String(event.id));
        $("#favorites-container").append(`
          <div class="card" data-id="${event.id}">
            <img src="${event.image || 'default.jpg'}" alt="${event.title}">
            <div class="card-content">
              <h3>${event.title}</h3>
              <p>${event.date} @ ${event.location}</p>
              <p>${event.category}</p>
              <button class="fav-btn ${isSaved ? 'saved' : ''}" data-id="${event.id}">
                ${isSaved ? 'Saved! 🎉' : 'Save'}
              </button>
            </div>
          </div>
        `);
      }
    });
  }

  // --- Handlers ---
  function bindHandlers() {
    // Search input
    $("#search").on("input", function() {
      const term = $(this).val().toLowerCase();
      selectedIndex = -1;

      if (!term) {
        $("#suggestions").empty();
        filterAndSortEvents();
        return;
      }

      const matches = eventsData.filter(e =>
        e.title.toLowerCase().includes(term) ||
        e.category.toLowerCase().includes(term) ||
        (e.tags && e.tags.some(tag => tag.toLowerCase().includes(term)))
      );

      $("#suggestions").empty();
      if (matches.length === 0) {
        $("#suggestions").append(`<li>No matching events found</li>`);
        return;
      }

      matches.slice(0, 5).forEach(event => {
        $("#suggestions").append(`<li data-id="${event.id}">${event.title}</li>`);
      });
    });

    // Suggestion click
    $(document).on("click", "#suggestions li", function() {
      const id = String($(this).data("id"));
      const event = eventsData.find(e => String(e.id) === id);
      if (event) {
        renderEvents([event]);
        $("#search").val(event.title);
      }
      $("#suggestions").empty();
    });

    // Search button
    $("#searchBtn").click(function() {
      const term = $("#search").val().toLowerCase();
      const filtered = eventsData.filter(e =>
        e.title.toLowerCase().includes(term) ||
        e.category.toLowerCase().includes(term) ||
        (e.tags && e.tags.some(tag => tag.toLowerCase().includes(term)))
      );
      renderEvents(filtered);
      $("#suggestions").empty();
    });

    // Category chips
    $(".chip").click(function() {
      const category = $(this).data("category");
      $(this).toggleClass("active");
      if ($(this).hasClass("active")) {
        selectedCategories.add(category);
      } else {
        selectedCategories.delete(category);
      }
      filterAndSortEvents();
    });

    // Sort dropdown
    $("#sort").change(function() {
      filterAndSortEvents();
    });
  }
});
