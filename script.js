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
      window.location.href = "index.html";
    })
    .catch(error => alert("❌ Error: " + error.message));
}

function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("⚠ Username aur password bharo!");
    return;
  }
cons usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    alert("⚠Username sirf alphabets, numbers ya underscore me hona chahiye. Space mat do!");
    return;
  }
  cons email = username + "@baalumafia.com";
  
  firebase.auth().signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      localStorage.setItem("loggedInUsername", username);
      localStorage.setItem("userPassword_", + username, password);
      alert("✅ Login successful!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("❌ Invalid Login!\n" + error.message);
    });
}
