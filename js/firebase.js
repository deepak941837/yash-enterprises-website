import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
console.log("Firebase Loaded ✅");
// 🔴 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCT6rg-hpi8mMiks6osZLhsbq6n59JLFNI",
  authDomain: "bvp-yash.firebaseapp.com",
  projectId: "bvp-yash",
  storageBucket: "bvp-yash.firebasestorage.app",
  messagingSenderId: "788259776577",
  appId: "1:788259776577:web:b1f183f4b6438cb8e7ec0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= CONTACT FORM =================
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");

  if (!form) return; // page safety

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    try {
      await addDoc(collection(db, "leads"), {
        name,
        email,
        phone,
        message,
        createdAt: new Date()
      });

      alert("✅ Message saved successfully!");

      form.reset();

    } catch (error) {
      console.error(error);
      alert("❌ Error saving message");
    }
  });

});