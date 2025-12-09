document.addEventListener("DOMContentLoaded", function() {
  const activeUser = getActiveUser();
  const signupLink = document.getElementById("signup-link");
  const loginLink = document.getElementById("login-link");
  const userInfo = document.getElementById("user-info");
  const usernameDisplay = document.getElementById("username-display");
  const logoutLink = document.getElementById("logout-link");

  if (activeUser) {
    if (signupLink) signupLink.style.display = "none";
    if (loginLink) loginLink.style.display = "none";
    if (userInfo) userInfo.style.display = "inline-block";
    if (usernameDisplay) usernameDisplay.textContent = activeUser.name;
  } else {
    if (signupLink) signupLink.style.display = "inline-block";
    if (loginLink) loginLink.style.display = "inline-block";
    if (userInfo) userInfo.style.display = "none";
  }

  if (logoutLink) {
    logoutLink.addEventListener("click", function(e) {
      e.preventDefault();
      logoutUser();
    });
  }
});
