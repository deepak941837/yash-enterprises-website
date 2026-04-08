document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const phone = document.querySelector("#phone")?.value || "";
    const message = document.querySelector("#message")?.value || "";

    // Simple validation
    if (!name || !email) {
      alert("Please fill all required fields ❗");
      return;
    }

    try {
      // 🔥 IMPORTANT: Your Render Backend URL
      const response = await fetch("https://yash-backend-a7dc.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Email sent successfully!");
        form.reset();
      } else {
        alert("❌ Failed to send email");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Server error. Please try again later.");
    }
  });

});