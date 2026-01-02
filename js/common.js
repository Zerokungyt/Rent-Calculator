// common.js

function requireLogin() {
  if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "../index.html";
  }
}

function goDashboard() {
  window.location.href = "../dashboard.html";
}

function logout() {
  sessionStorage.clear();
  window.location.href = "../index.html";
}
