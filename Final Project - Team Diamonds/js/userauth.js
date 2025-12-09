// --- Helpers ---
// Get all users from localStorage (returns array or empty if none)
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Save updated users array back to localStorage
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Get currently active user (returns object or null)
function getActiveUser() {
  return JSON.parse(localStorage.getItem("activeUser")) || null;
}

// Set active user (marks session as logged in)
function setActiveUser(user) {
  localStorage.setItem("activeUser", JSON.stringify(user));
  localStorage.setItem("loggedIn", "true");
}

// Clear active user (logs out)
function clearActiveUser() {
  localStorage.removeItem("activeUser");
  localStorage.removeItem("loggedIn");
}

// --- Regex Validators ---
// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength
function isValidPassword(pass) {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return passRegex.test(pass);
}

// --- Signup ---
// Register new user and save to users array
function registerUser(name, email, pass) {
  const users = getUsers();

  // Validate inputs
  if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!isValidPassword(pass)) {
    alert("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
    return false;
  }
  if (users.some(u => u.email === email)) {
    alert("Email already exists.");
    return false;
  }

  // Add new user
  users.push({ name, email, pass });
  saveUsers(users);

  alert("Registered! Now log in.");
  window.location.href = "../HTML/loginpage.html"; // redirect to login page
  return false;
}

// --- Login ---
// Authenticate user and set active session
function loginUser(email, pass, rememberMe = false) {
  if (!isValidEmail(email)) {
    alert("Invalid email format.");
    return false;
  }

  const users = getUsers();
  const user = users.find(u => u.email === email && u.pass === pass);

  if (!user) {
    alert("Login failed. Please check your credentials.");
    return false;
  }

  setActiveUser(user);

  // Handle remember me
  if (rememberMe) {
    localStorage.setItem("rememberEmail", email);
  } else {
    localStorage.removeItem("rememberEmail");
  }

  alert("Login successful! Welcome " + user.name + ".");
  window.location.href = "../HTML/events.html"; // redirect to events page
  return false;
}

// --- Logout ---
// Clear active session and redirect to login
function logoutUser() {
  clearActiveUser();
  window.location.href = "../HTML/loginpage.html";
}
