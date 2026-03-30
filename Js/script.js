// Initialize AOS
AOS.init({ duration: 700, once: false, offset: 100 });

// Initialize Swiper (ONLY if element exists on this page)
if (document.querySelector(".testimonial-swiper")) {
  new Swiper(".testimonial-swiper", {
    loop: true,
    autoplay: { delay: 4500, disableOnInteraction: false },
    pagination: { el: ".swiper-pagination", clickable: true },
    spaceBetween: 25,
    slidesPerView: 1,
    breakpoints: { 768: { slidesPerView: 2 } },
  });
}

// Off-Canvas Menu
const menuToggle = document.getElementById("menuToggleBtn");
const offcanvas = document.getElementById("offcanvasMenu");
const overlay = document.getElementById("offcanvasOverlay");
const closeBtn = document.getElementById("closeOffcanvas");

function openMenu() {
  offcanvas.classList.add("open");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  offcanvas.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

if (menuToggle) menuToggle.addEventListener("click", openMenu);
if (closeBtn) closeBtn.addEventListener("click", closeMenu);
if (overlay) overlay.addEventListener("click", closeMenu);

// Close menu when clicking mobile nav links
document
  .querySelectorAll(".offcanvas-menu .nav-link-mobile")
  .forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
const mobileApplyBtn = document.getElementById("mobileApplyBtn");
if (mobileApplyBtn) mobileApplyBtn.addEventListener("click", closeMenu);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target && this.getAttribute("href") !== "#") {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Counter animation (ONLY if stat cards exist)
const counters = document.querySelectorAll(".counter");
let counted = false;
const startCounters = () => {
  if (counted) return;
  counted = true;
  counters.forEach((c) => {
    let target = +c.getAttribute("data-target");
    let count = 0;
    let increment = target / 45;
    let update = () => {
      count += increment;
      if (count < target) {
        c.innerText = Math.ceil(count);
        setTimeout(update, 20);
      } else c.innerText = target;
    };
    update();
  });
};

if (document.querySelectorAll(".stat-card").length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 },
  );
  document
    .querySelectorAll(".stat-card")
    .forEach((card) => observer.observe(card));
}

// Dark Mode Toggle
const darkToggle = document.getElementById("darkModeToggleNav");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = darkToggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  });
}

// Contact form
const contactForm = document.getElementById("globalContactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedbackDiv = document.getElementById("contactFeedback");
    feedbackDiv.innerHTML = `<div class="alert alert-success rounded-pill small">✅ Thank you! We'll get back to you within 24 hours.</div>`;
    contactForm.reset();
    setTimeout(() => (feedbackDiv.innerHTML = ""), 5000);
  });
}

// Application form
const appForm = document.getElementById("applicationForm");
if (appForm) {
  appForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const feedbackDiv = document.getElementById("appFeedback");
    feedbackDiv.innerHTML = `<div class="alert alert-success rounded-pill small">✅ Application submitted! We will contact you within 3 business days.</div>`;
    appForm.reset();
    setTimeout(() => (feedbackDiv.innerHTML = ""), 5000);
  });
}

// Newsletter
const subBtn = document.getElementById("subNewsBtn");
if (subBtn) {
  subBtn.addEventListener("click", () => {
    let email = document.getElementById("newsEmail").value;
    if (email && email.includes("@")) {
      alert(`📧 Thank you! ${email} has been subscribed to our newsletter.`);
      document.getElementById("newsEmail").value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  });
}

// Active nav highlight on scroll (desktop) - only for pages with sections
if (document.querySelectorAll("section[id]").length > 0) {
  const sections = document.querySelectorAll("section[id]");
  const navLinksDesktop = document.querySelectorAll(".nav-link-desktop");
  function updateActiveNav() {
    let scrollPos = window.scrollY + 150;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinksDesktop.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.style.color = "#1e5c2f";
            link.style.fontWeight = "600";
          } else {
            link.style.color = "";
            link.style.fontWeight = "";
          }
        });
      }
    });
  }
  window.addEventListener("scroll", updateActiveNav);
  window.addEventListener("load", updateActiveNav);
}

// Read more links (prevents default for demo)
document.querySelectorAll(".read-more-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Full article coming soon. Stay tuned!");
  });
});
