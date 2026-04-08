require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

const app = express();
app.use(express.json());

/* ==============================
   FIREBASE INIT (USE YOUR EXISTING KEY)
============================== */
const serviceAccount = require("./firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

/* ==============================
   TEST ROUTE
============================== */
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

/* ==============================
   GMAIL TRANSPORTER
============================== */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* ==============================
   CONTACT FORM API
============================== */
app.post("/contact", async (req, res) => {

  const { name, email, phone, message } = req.body;

  // ✅ validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Required fields missing ❌" });
  }

  try {

    /* ==========================
       1️⃣ SAVE TO FIREBASE
    ========================== */
    await db.collection("leads").add({
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date()
    });

    /* ==========================
       2️⃣ ADMIN EMAIL
    ========================== */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Lead 🚀",
      html: `
        <h3>New Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    /* ==========================
       3️⃣ AUTO REPLY
    ========================== */
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // ✅ FIXED
      to: email,
      subject: "Thanks for contacting Yash Enterprises 🙏",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting us.</p>
        <p>We will get back to you shortly.</p>
        <br>
        <b>Yash Enterprises</b>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ error: "Something went wrong ❌" });
  }
});

/* ==============================
   SERVER START
============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});