// ACCOUNT
const AUTH = {
  username: "Lukinn",
  passwordHash: "0ef3e168bc0b685185e3ea6a37a49723"
};

// AUTO REDIRECT IF LOGIN
if (sessionStorage.getItem("loggedIn") === "true") {
  window.location.href = "dashboard.html";
}

function login() {
  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value.trim();
  const error = document.getElementById("error");

  error.style.display = "none";

  if (u !== AUTH.username) {
    error.style.display = "block";
    return;
  }

  const hash = md5(p);
  if (hash === AUTH.passwordHash) {
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    error.style.display = "block";
  }
}

