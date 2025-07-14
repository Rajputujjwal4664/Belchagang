firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    alert("❌ Please login first!");
    window.location.href = "login.html";
  }
});

function postWork() {
  const title = document.getElementById("workTitle").value.trim();
  const place = document.getElementById("workPlace").value.trim();
  const date = document.getElementById("workDate").value;

  if (!title || !place || !date) {
    alert("⚠ Fill all fields!");
    return;
  }

  const user = firebase.auth().currentUser;
  const username = user.email.split("@")[0]; // eg: ravi@baalumafia.com → ravi

  const workId = Date.now();
  firebase.database().ref("works/" + workId).set({
    title,
    place,
    date,
    postedBy: username,
    completedBy: []
  });

  document.getElementById("workTitle").value = "";
  document.getElementById("workPlace").value = "";
  document.getElementById("workDate").value = "";
}

firebase.database().ref("works").on("value", (snapshot) => {
  const workList = document.getElementById("workList");
  workList.innerHTML = "";

  const user = firebase.auth().currentUser;
  const username = user.email.split("@")[0];

  snapshot.forEach((childSnap) => {
    const work = childSnap.val();
    const workId = childSnap.key;
    const isCompleted = work.completedBy?.includes(username);

    const workDiv = document.createElement("div");
    workDiv.className = "work-item";
    workDiv.innerHTML = `
      <h3>📌 ${work.title}</h3>
      <p><strong>Place:</strong> ${work.place}</p>
      <p><strong>Date:</strong> ${work.date}</p>
      <p><strong>Posted by:</strong> ${work.postedBy}</p>
      <label>
        <input type="checkbox" ${isCompleted ? "checked disabled" : ""} onchange="markDone('${workId}')">
        ✅ Mark as Done
      </label>
      <p><strong>Completed by:</strong> ${work.completedBy?.join(", ") || "None yet"}</p>
      <hr>
    `;
    workList.appendChild(workDiv);
  });
});

function markDone(workId) {
  const user = firebase.auth().currentUser;
  const username = user.email.split("@")[0];

  const ref = firebase.database().ref("works/" + workId + "/completedBy");
  ref.once("value").then((snap) => {
    const list = snap.val() || [];
    if (!list.includes(username)) {
      list.push(username);
      ref.set(list);
    }
  });
}