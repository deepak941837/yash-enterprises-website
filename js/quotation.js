document.getElementById("quotationForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.querySelector("[name='name']").value;
  const phone = document.querySelector("[name='phone']").value;
  const service = document.querySelector("[name='serviceType']").value;
  const location = document.querySelector("[name='location']").value;
  const cameras = document.querySelector("[name='cameras']").value;
  const coverage = document.querySelector("[name='coverage']").value;

  // Features (multiple)
  const features = Array.from(document.querySelectorAll("input[name='features[]']:checked"))
    .map(el => el.value)
    .join(", ");

  const description = document.querySelector("[name='description']").value;

  // 📲 WhatsApp Message
  const message = `📌 New CCTV Inquiry

👤 Name: ${name}
📞 Phone: ${phone}

🔧 Service: ${service}
📍 Location: ${location}
📷 Cameras: ${cameras}
🏠 Coverage: ${coverage}

✨ Features: ${features || "Not specified"}

📝 Details:
${description}`;

  const whatsappNumber = "919308907319"; // 👈 your number

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

const params = new URLSearchParams(window.location.search);
const service = params.get("service");

console.log(service); // test

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