document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("newsletter-form");
  if (!form) return; // only run if form exists

  const emailInput = document.getElementById("newsletter-email");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Real-time warnings
  emailInput.addEventListener("input", function() {
    const email = emailInput.value.trim();
    if (email === "") {
      errorMessage.style.display = "none"; // no inline warning for blank
    } else if (!emailPattern.test(email)) {
      errorMessage.style.display = "block"; // show inline warning
    } else {
      errorMessage.style.display = "none"; // hide warning when valid
    }
  });

  // Handle form submit
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (email === "") {
      alert("You can't subscribe to the newsletter if the email field is blank.");
      return;
    }

    if (!emailPattern.test(email)) {
      // Inline warning already shown in real-time
      return;
    }

    // ✅ Valid email → show success
    successMessage.style.display = "block";
    successMessage.style.opacity = "1";
    emailInput.value = "";

    setTimeout(() => {
      successMessage.style.opacity = "0";
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 500);
    }, 5000);
  });
});
