// ================= DETECT BASE PATH =================
function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) {
    console.warn(`Element #${id} not found in HTML`);
    return;
  }

  fetch("/components/" + file)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Component not found: /components/${file}`);
      }
      return res.text();
    })
    .then(data => {
      element.innerHTML = data;

      console.log(`Loaded: ${id}`);

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

  loadComponent("navbar", "navbar.html");
loadComponent("footer", "footer.html");
loadComponent("floating", "floating-contact.html");

});