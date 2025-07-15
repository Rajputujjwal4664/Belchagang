// ✅ SIGNUP FUNCTION
function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const email = username + "@baalumafia.com";

  // Validation
  if (!username || !password || !confirmPassword) {
    alert("⚠ Sab fields bharo bhaiya.");
    return;
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    alert("⚠ Username me sirf letters, numbers ya underscore allowed hai.");
    return;
  }

  const strongPasswordRegex = /^.{6,}$/;
  if (!strongPasswordRegex.test(password)) {
    alert("⚠ Password kamzor hai. Kam se kam 6 characters hona chahiye.");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ Password aur Confirm Password match nahi kar rahe.");
    return;
  }

  // Firebase Signup
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      // Save to localStorage
      localStorage.setItem("loggedInUsername", username);
      localStorage.setItem("userPassword_" + username, password);

      alert("✅ Account ban gaya! Ab login karo.");
      window.location.href = "index.html";
    })
    .catch(error => {
      alert("❌ Error: " + error.message);
    });
}

// ✅ LOGIN FUNCTION
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = username + "@baalumafia.com";

  // Validation
  if (!username || !password) {
    alert("⚠ Username aur password bharo!");
    return;
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    alert("⚠ Username me sirf letters, numbers ya underscore allowed hai.");
    return;
  }

  // Firebase Login
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // Save to localStorage
      localStorage.setItem("loggedInUsername", username);
      localStorage.setItem("userPassword_" + username, password);

      alert("✅ Login successful!");
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("❌ Invalid Login!\n" + error.message);
    });
}
