require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

const app = express();

app.use(cors());
app.use(express.json());

/* ==============================
   FIREBASE INIT
============================== */
if (!process.env.FIREBASE_KEY) {
  console.error("❌ FIREBASE_KEY environment variable is not set!");
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

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
   EMAIL SETUP
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

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Required fields missing ❌" });
  }

  try {
    // Save to Firebase
    await db.collection("leads").add({
      name,
      email,
      phone: phone || "",
      message,
      createdAt: new Date()
    });

    // Admin email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Contact Lead 🚀",
      html: `
        <h3>New Contact Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone || "N/A"}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    // Auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for contacting Yash Enterprises 🙏",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for contacting us.</p>
        <p>We will get back to you shortly.</p>
      `
    });

    res.json({ success: true });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ error: "Something went wrong ❌" });
  }
});


/* ==============================
   SERVICE QUOTATION API (🔥 NEW)
============================== */
app.post("/service-quotation", async (req, res) => {
  try {
    const data = req.body;

    // ✅ Save to Firebase FIRST
    await db.collection("service_quotations").add({
      ...data,
      createdAt: new Date()
    });

    // ✅ Email (optional - fail safe)
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Quotation Request 📩",
        html: `
          <h3>New Quotation</h3>
          <p><b>Name:</b> ${data.name}</p>
          <p><b>Phone:</b> ${data.phone}</p>
          <p><b>Service:</b> ${data.serviceType}</p>
          <p><b>Location:</b> ${data.location}</p>
          <p><b>Description:</b> ${data.description}</p>
        `
      });
    } catch (emailError) {
      console.error("Email failed but continuing:", emailError);
    }

    // ✅ ALWAYS success
    res.json({ success: true });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Server error ❌" });
  }
});

/* ==============================
   SERVER START
============================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});