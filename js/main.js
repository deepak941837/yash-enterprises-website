// ================= DETECT BASE PATH =================
const isInPages = window.location.pathname.includes("/pages/");
const basePath = isInPages ? "../" : "./";


// ================= LOAD COMPONENT FUNCTION =================
function loadComponent(id, file) {
  const element = document.getElementById(id);

  // Debug: check if element exists
  if (!element) {
    console.warn(`Element #${id} not found in HTML`);
    return;
  }

  fetch(basePath + file)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Component not found: ${basePath + file}`);
      }
      return res.text();
    })
    .then(data => {
      element.innerHTML = data;

      console.log(`Loaded: ${id}`); // ✅ debug log

      // Run navbar logic after loading
      if (id === "navbar") {
        setupNavbar();
      }
    })
    .catch(err => console.error(err));
}


// ================= NAVBAR LOGIC =================
function setupNavbar() {

  const links = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    let href = link.getAttribute("href");

    if (!href) return;

    // Normalize path
    href = href.replace("../", "");

    if (currentPage === href) {
      link.classList.add("active");
    }
  });

  // Mobile menu toggle
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }
}


// ================= LOAD ALL COMPONENTS =================
document.addEventListener("DOMContentLoaded", () => {

  console.log("Main.js Loaded ✅");

  loadComponent("navbar", "components/navbar.html");
  loadComponent("footer", "components/footer.html");
  loadComponent("floating", "components/floating-contact.html");

});