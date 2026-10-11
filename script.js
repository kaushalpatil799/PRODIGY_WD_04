
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const typingText = document.getElementById("typingText");
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

const roles = [
  "Python Developer",
  "Django Developer",
  "Web Developer",
  "Software Developer"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!deleting) {
    typingText.textContent = currentRole.slice(0, characterIndex + 1);
    characterIndex++;

    if (characterIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeRole, 1300);
      return;
    }
  } else {
    typingText.textContent = currentRole.slice(0, characterIndex - 1);
    characterIndex--;

    if (characterIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeRole, deleting ? 45 : 85);
}

typeRole();

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i data-lucide="x"></i>'
    : '<i data-lucide="menu"></i>';

  lucide.createIcons();
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  });
});

function setTheme(isLight) {
  document.body.classList.toggle("light-theme", isLight);

  themeToggle.innerHTML = isLight
    ? '<i data-lucide="sun"></i>'
    : '<i data-lucide="moon"></i>';

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );

  lucide.createIcons();
}

const savedTheme = localStorage.getItem("portfolio-theme");
setTheme(savedTheme === "light");

themeToggle.addEventListener("click", () => {
  const isLight = !document.body.classList.contains("light-theme");

  setTheme(isLight);
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      }
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px"
  }
);

sections.forEach(section => {
  sectionObserver.observe(section);
});


document.getElementById("year").textContent = new Date().getFullYear();

contactForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !subject || !message) {
    formNote.textContent = "Please fill in all the fields.";
    return;
  }

  const recipient = "your.email@example.com";
  const emailSubject = encodeURIComponent(subject);
  const emailBody = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formNote.textContent = "Opening your email application...";

  window.location.href =
    `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;
});

lucide.createIcons();
