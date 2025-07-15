function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const email = username + "@baalumafia.com";

  if (!username || !password || !confirmPassword) {
    alert("⚠ Sab fields bharo bhaiya.");
    return;
  }

  // ✅ FIXED Regex for strong password
  const strongPasswordRegex = /^.{6,}$/;

  if (!strongPasswordRegex.test(password)) {
    alert("⚠ Password weak hai!\nUse at least:\n- 8 characters\n- 1 uppercase\n- 1 lowercase\n- 1 number\n- 1 special symbol (@#$%^&+=!)");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ Password aur confirm password match nahi kar rahe.");
    return;
  }

  // ✅ Firebase Signup
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      alert("✅ Account ban gaya! Ab login karo.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("⚠ Error: " + error.message);
    });
}
