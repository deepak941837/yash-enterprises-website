require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

// test route
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// test email route
app.get("/send", async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Email ✅",
      text: "Gmail SMTP working successfully!"
    });

    res.send("Email sent successfully ✅");

  } catch (error) {
    console.log(error);
    res.send("Error sending email ❌");
  }
});

app.use(express.json());

// CONTACT FORM API
app.post("/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    // 1️⃣ Save to Firebase (agar already setup hai)
    await db.collection("leads").add({
      name,
      email,
      phone,
      message,
      createdAt: new Date()
    });

    // 2️⃣ Admin Email (tumhe)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Lead 🚀",
      html: `
        <h3>New Inquiry</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `
    });

    // 3️⃣ Auto Reply (client ko)
    setTimeout(async () => {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
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
    }, 2000);

    res.json({ success: true });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong ❌" });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000 🚀");
});