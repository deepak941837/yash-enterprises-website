// ===============================
// SALES QUOTATION SCRIPT (FINAL UPDATED)
// ===============================

// ✅ GET PRODUCT FROM URL
function getProductType() {
  const params = new URLSearchParams(window.location.search);
  return params.get("product")?.toLowerCase() || "cctv";
}

// ===============================
// PRODUCT FIELD CONFIG
// ===============================
const fieldsConfig = {
  cctv: [
    { label: "Camera Type", name: "type", type: "select", options: ["Dome", "Bullet"] },
    { label: "Brand", name: "brand", type: "select", options: ["CP Plus", "Hikvision"] },
    { label: "Quantity", name: "quantity", type: "number" }
  ],
  computer: [
    { label: "Type", name: "type", type: "select", options: ["Desktop", "Laptop"] },
    { label: "Usage", name: "usage", type: "select", options: ["Office", "Gaming"] },
    { label: "Quantity", name: "quantity", type: "number" }
  ],
  fire: [
    { label: "Equipment Type", name: "type", type: "select", options: ["Extinguisher", "Alarm"] },
    { label: "Quantity", name: "quantity", type: "number" }
  ],
  network: [
    { label: "Product Type", name: "type", type: "select", options: ["Router", "Switch"] },
    { label: "Brand", name: "brand", type: "select", options: ["TP-Link", "D-Link"] },
    { label: "Quantity", name: "quantity", type: "number" }
  ],
  biometric: [
    { label: "Product Type", name: "type", type: "select", options: ["Fingerprint Scanner", "Face Recognition"] },
    { label: "Brand", name: "brand", type: "select", options: ["Essl", "Real Time"] },
    { label: "Quantity", name: "quantity", type: "number" }
  ]
};

// ===============================
// CREATE FIELD
// ===============================
function createField(field) {
  let html = `<div class="form-group">`;
  html += `<label>${field.label}</label>`;

  if (field.type === "select") {
    html += `<select name="${field.name}">`;
    field.options.forEach(opt => {
      html += `<option value="${opt}">${opt}</option>`;
    });
    html += `</select>`;
  }

  if (field.type === "number") {
    html += `<input type="number" name="${field.name}" placeholder="Enter ${field.label}" />`;
  }

  html += `</div>`;
  return html;
}

// ===============================
// LOAD FORM
// ===============================
function loadForm() {
  const product = getProductType();
  const container = document.getElementById("dynamicForm");

  if (!fieldsConfig[product]) {
    container.innerHTML = "<p>Invalid Product</p>";
    return;
  }

  let html = "";
  fieldsConfig[product].forEach(field => {
    html += createField(field);
  });

  container.innerHTML = html;
}

// ===============================
// GET FORM DATA
// ===============================
function getFormData() {
  const data = {};
  const inputs = document.querySelectorAll("input, select, textarea");

  inputs.forEach(input => {
    if (input.name) {
      data[input.name] = input.value;
    }
  });

  return data;
}

// ===============================
// TITLE UPDATE
// ===============================
function updatePageTitle(product) {
  const titles = {
    cctv: "Buy CCTV Cameras",
    computer: "Buy Computer / Laptop",
    biometric: "Buy Biometric Systems",
    fire: "Buy Fire Safety Equipment",
    network: "Buy Networking Products"
  };

  document.getElementById("pageTitle").innerText =
    titles[product] || "Get Product Quote";
}

// ===============================
// 🚀 NEW: MAIN SUBMIT FLOW
// ===============================
async function handleSubmit(e) {
  e.preventDefault();

  const product = getProductType();
  const data = getFormData();

  if (!data.name || !data.phone || !data.email) {
    alert("Enter Name, Phone & Email ❌");
    return;
  }

  try {

    // =========================
    // 1️⃣ FIREBASE (BACKEND)
    // =========================
try {
  const res = await fetch("https://yash-backend-a7dc.onrender.com/sales-quotation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...data, product })
  });

  const result = await res.text();
  console.log("Server response:", result);

} catch (err) {
  console.error("Fetch error:", err);
}

    // =========================
    // 2️⃣ EMAILJS
    // =========================
    let formattedMessage = "";

    for (let key in data) {
      if (data[key]) {
        formattedMessage += `${key}: ${data[key]}\n`;
      }
    }

    await emailjs.send(
      "service_0vtjhe9",
      "template_e9xyyrl",
      {
        name: data.name,
        phone: data.phone,
        email: data.email,
        product: product.toUpperCase(),
        message: formattedMessage
      },
      "KUtCndDkQSAFFal5w"
    );

    // =========================
    // 3️⃣ SUCCESS ALERT
    // =========================
    alert("Quotation submitted successfully ✅");

    // =========================
    // 4️⃣ WHATSAPP
    // =========================
    let message = `*New ${product.toUpperCase()} Product Enquiry*\n\n`;

    for (let key in data) {
      if (data[key]) {
        message += `${key}: ${data[key]}\n`;
      }
    }

    window.open(
      `https://wa.me/917783097357?text=${encodeURIComponent(message)}`,
      "_blank"
    );

  } catch (error) {
    console.error(error);
    alert("Something went wrong ❌");
  }
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const product = getProductType();

  updatePageTitle(product);
  loadForm();

  // 🔥 NEW: FORM SUBMIT
  document.getElementById("salesForm")
    .addEventListener("submit", handleSubmit);

});