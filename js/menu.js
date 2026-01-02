if (sessionStorage.getItem("loggedIn") !== "true") {
  location.href = "index.html";
}

function logout() {
  sessionStorage.clear();
  location.href = "index.html";
}
