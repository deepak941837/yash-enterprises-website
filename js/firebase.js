import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// 🔴 Your Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "bvp-yash.firebaseapp.com",
  projectId: "bvp-yash",
  storageBucket: "bvp-yash.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
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