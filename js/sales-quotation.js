// ===============================
// SALES QUOTATION SCRIPT (UPDATED)
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
// WHATSAPP MESSAGE
// ===============================
function sendToWhatsApp() {
  const product = getProductType();
  const data = getFormData();

  if (!data.name || !data.phone) {
    alert("Enter Name & Phone");
    return;
  }

  let message = `*New ${product.toUpperCase()} Product Enquiry*%0A%0A`;

  for (let key in data) {
    if (data[key]) {
      message += `${key}: ${data[key]}%0A`;
    }
  }

  const yourNumber = "917783097357";

  window.open(`https://wa.me/${yourNumber}?text=${message}`, "_blank");
}

// ===============================
// TITLE UPDATE (🔥 FIXED HERE)
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
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const product = getProductType();

  updatePageTitle(product); // ✅ now works for ALL
  loadForm();

  document.getElementById("whatsappBtn")
    .addEventListener("click", sendToWhatsApp);

});