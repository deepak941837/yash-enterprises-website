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

  const whatsappNumber = "917783097357"; // 👈 your number

  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});