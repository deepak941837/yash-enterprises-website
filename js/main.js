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

      // NAVBAR INIT
      if (id === "navbar") {
        setupNavbar();
      }

      // ✅ CHATBOT INIT (FIX ADDED)
      if (id === "chatbot") {
        initChatbot();
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

// ================= CHATBOT LOGIC =================
function initChatbot() {
  const chatToggle = document.getElementById("chat-toggle");
  const chatBox = document.querySelector(".chatbot-container");
  const chatClose = document.getElementById("chat-close");

  if (!chatToggle || !chatBox) return;

  chatToggle.onclick = () => {
    chatBox.style.display = "flex";
  };

  chatClose.onclick = () => {
    chatBox.style.display = "none";
  };

  const sendBtn = document.getElementById("chat-send");
  const input = document.getElementById("chat-input");
  const chatBody = document.getElementById("chat-body");

  sendBtn.onclick = () => {
    const msg = input.value.trim();
    if (!msg) return;

    // USER MESSAGE
    const userDiv = document.createElement("div");
    userDiv.className = "user-msg";
    userDiv.innerText = msg;
    chatBody.appendChild(userDiv);

    // BOT MESSAGE
    const botDiv = document.createElement("div");
    botDiv.className = "bot-msg";
    botDiv.innerText = "We will help you shortly.";
    setTimeout(() => chatBody.appendChild(botDiv), 500);

    input.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
  };
}

// ================= CARD TILT EFFECT =================
function initCardTilt() {
  const cards = document.querySelectorAll(".commerce-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 15;
      const rotateY = (x - rect.width / 2) / 15;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });
  });
}

// ================= LOAD ALL COMPONENTS =================
document.addEventListener("DOMContentLoaded", () => {

  console.log("Main.js Loaded ✅");

  loadComponent("navbar", "navbar.html");
  loadComponent("footer", "footer.html");
  loadComponent("floating", "floating-contact.html");

  // ✅ CHATBOT LOAD (FIX ADDED)
  loadComponent("chatbot", "chatbot.html");

  // ✅ INIT CARD EFFECT AFTER LOAD
  initCardTilt();
});

// ================= PAGE TRANSITION =================
window.addEventListener("load", () => {
    const overlay = document.querySelector(".page-transition");
    if (overlay) {
        overlay.classList.add("hide");
    }
});

// intercept link clicks
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (!href || href.startsWith("#")) return;

        e.preventDefault();

        const overlay = document.querySelector(".page-transition");
        overlay.classList.remove("hide");
        overlay.classList.add("show");

        setTimeout(() => {
            window.location.href = href;
        }, 400);
    });
});