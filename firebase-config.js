// ✅ Firebase ka configuration object (aapko apna wala daalna hai)
const firebaseConfig = {
  apiKey: "AIzaSyCCx4QaXdzuUrZki39zJPZH9xXYUgmt2cY",
  authDomain: "belcha-gang.firebaseapp.com",
  projectId: "belcha-gang",
  storageBucket: "belcha-gang.firebasestorage.com",
  messagingSenderId: "762357625552",
  appId: "1:762357625552:web:8a47b837b19ea7ad0864d5",
  databaseURL: "https://belcha-gang-default-rtdb.firebaseio.com"
};

// ✅ Firebase ko initialize karo
firebase.initializeApp(firebaseConfig);
