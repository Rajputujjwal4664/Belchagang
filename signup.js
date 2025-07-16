function signup() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const email = username + "@baalumafia.com";

  if (!username || !password || !confirmPassword) {
    alert("⚠ Sab fields bharo bhaiya.");
    return;
  }

  const strongPasswordRegex = /^.{6,}$/;
  if (!strongPasswordRegex.test(password)) {
    alert("⚠ Password weak hai!\nUse at least 6 characters.");
    return;
  }

  if (password !== confirmPassword) {
    alert("❌ Password aur confirm password match nahi kar rahe.");
    return;
  }

  // ✅ Step 1: Firebase Auth Signup
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;

      // ✅ Step 2: Save user data in Realtime Database
      const userData = {
        username: username,
        password: password,
        createdAt: Date.now(),
        status: "pending",  // Default: not yet approved
        profilePic: "",     // Will be set later
        uid: uid
      };

      firebase.database().ref("users/" + username).set(userData)
        .then(() => {
          localStorage.setItem("loggedInUsername", username);
          localStorage.setItem("userPassword_" + username, password);
          alert("✅ Account ban gaya! Ab login karo.");
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("❌ Database error: " + error.message);
        });
    })
    .catch((error) => {
      alert("⚠ Auth error: " + error.message);
    });
}
