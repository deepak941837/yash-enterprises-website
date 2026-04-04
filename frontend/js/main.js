// Load Navbar
fetch("./components/navbar.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("navbar").innerHTML = data;

    // Active link highlight
    const links = document.querySelectorAll(".nav-links a");
    const currentPage = window.location.pathname;

    links.forEach(link => {
      if (currentPage.includes(link.getAttribute("href"))) {
        link.classList.add("active");
      }
    });

    // ✅ MOBILE MENU FIX (IMPORTANT)
    const toggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (toggle && navLinks) {
      toggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
      });
    }
  });


// Load Footer
fetch("./components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });