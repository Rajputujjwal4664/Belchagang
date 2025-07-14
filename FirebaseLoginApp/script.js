function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const email = username + "@baalumafia.com";

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("🧨 Account created! Now login.");
      window.location.href = "Login.html";
    })
    .catch(error => alert("❌ Error: " + error.message));
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = username + "@baalumafia.com";

  if (!username || !password) {
    alert("⚠ Username aur password bharo!");
    return;
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("✅ Login successful!");
      localStorage.setItem("loggedInUsername", username);
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("❌ Error: " + error.message);
    });
}