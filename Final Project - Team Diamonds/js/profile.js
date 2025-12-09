$(document).ready(function() {
  // Load saved profile data
  const savedName = localStorage.getItem("profileName");
  const savedEmail = localStorage.getItem("profileEmail");
  const savedPrefs = JSON.parse(localStorage.getItem("profileCategories")) || [];

  if (savedName) $("#profileName").val(savedName);
  if (savedEmail) $("#profileEmail").val(savedEmail);

  // Check saved categories
  $("input[type=checkbox]").each(function() {
    if (savedPrefs.includes($(this).val())) {
      $(this).prop("checked", true);
    }
  });

  // Handle form submit
  $("#profileForm").submit(function(e) {
    e.preventDefault();

    const name = $("#profileName").val().trim();
    const email = $("#profileEmail").val().trim();
    const categories = $("input[type=checkbox]:checked")
      .map(function() { return $(this).val(); })
      .get();

    localStorage.setItem("profileName", name);
    localStorage.setItem("profileEmail", email);
    localStorage.setItem("profileCategories", JSON.stringify(categories));

    $("#profileMessage").text("Preferences saved successfully!").css("color", "green");
  });
});
