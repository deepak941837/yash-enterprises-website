// ===============================
// FORM SUBMIT (🔥 UPDATED)
// ===============================
document.getElementById("quotationForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = {
    name: document.querySelector("[name='name']").value,
    phone: document.querySelector("[name='phone']").value,
    serviceType: document.querySelector("[name='serviceType']")?.value,
    location: document.querySelector("[name='location']")?.value,
    cameras: document.querySelector("[name='cameras']")?.value,
    coverage: document.querySelector("[name='coverage']")?.value,
    description: document.querySelector("[name='description']").value
  };

  // Basic validation
  if (!data.name || !data.phone) {
    alert("Please enter Name and Phone ❌");
    return;
  }

  try {
    // ✅ 1. Send data to backend (Firebase save)
    await fetch("https://yash-backend-a7dc.onrender.com/service-quotation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // ✅ 2. Success message
    alert("Quotation request submitted successfully ✅");

    // ✅ 3. WhatsApp message
    const message = `📌 New Inquiry

👤 Name: ${data.name}
📞 Phone: ${data.phone}

🔧 Service: ${data.serviceType || "N/A"}
📍 Location: ${data.location || "N/A"}
📷 Cameras: ${data.cameras || "N/A"}
🏠 Coverage: ${data.coverage || "N/A"}

📝 Details:
${data.description || "N/A"}`;

    const whatsappNumber = "919308907319";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong ❌");
  }
});


// ===============================
// DYNAMIC SERVICE LOGIC (UNCHANGED)
// ===============================
const params = new URLSearchParams(window.location.search);
const service = params.get("service");

// Change title dynamically
const title = document.querySelector("h1");

if (service === "cctv") {
  title.innerText = "Get CCTV Installation Quote";
} 
else if (service === "biometric") {
  title.innerText = "Get Biometric System Quote";
}
else if (service === "fire") {
  title.innerText = "Get Fire Safety Quote";
}
else if (service === "network") {
  title.innerText = "Get Network Service Quote";
}
else if (service === "computer") {
  title.innerText = "Get Computer Service Quote";
}
else if (service === "maintenance") {
  title.innerText = "Get Website & App Maintenance Quote";
}

// Sections
const cctv = document.getElementById("cctvFields");
const biometric = document.getElementById("biometricFields");
const fire = document.getElementById("fireFields");
const network = document.getElementById("networkFields");
const computer = document.getElementById("computerFields");
const maintenance = document.getElementById("maintenanceFields");

// Hide all first
[cctv, biometric, fire, network, computer, maintenance].forEach(el => {
  el.style.display = "none";
});

// Show based on service
if (service === "cctv") cctv.style.display = "block";
else if (service === "biometric") biometric.style.display = "block";
else if (service === "fire") fire.style.display = "block";
else if (service === "network") network.style.display = "block";
else if (service === "computer") computer.style.display = "block";
else if (service === "maintenance") maintenance.style.display = "block";