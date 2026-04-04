// ================= DETECT BASE PATH =================
const isInPages = window.location.pathname.includes("/pages/");
const basePath = isInPages ? "../" : "./";


// ================= LOAD COMPONENT FUNCTION =================
function loadComponent(id, file) {
  fetch(basePath + file)
    .then(res => {
      if (!res.ok) {
        throw new Error("Component not found: " + file);
      }
      return res.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;

      // Run extra logic after navbar loads
      if (id === "navbar") {
        setupNavbar();
      }
    })
    .catch(err => console.error(err));
}


// ================= NAVBAR LOGIC =================
function setupNavbar() {

  // Active link highlight
  const links = document.querySelectorAll(".nav-links a");
  const currentPage = window.location.pathname;

  links.forEach(link => {
    const href = link.getAttribute("href");

    if (currentPage.includes(href.replace("../", ""))) {
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
loadComponent("navbar", "components/navbar.html");
loadComponent("footer", "components/footer.html");
loadComponent("floating-contact", "components/floating-contact.html");