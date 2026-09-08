// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("active");
});

// Close mobile menu after clicking a link

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("active");
  });
});

// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Empty field validation

  if (name === "" || email === "" || subject === "" || message === "") {
    formMessage.textContent = "Please fill in all fields.";

    formMessage.style.color = "red";

    return;
  }

  // Email validation

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    formMessage.textContent = "Please enter a valid email address.";

    formMessage.style.color = "red";

    return;
  }

  // Success message

  formMessage.textContent = "Message sent successfully!";

  formMessage.style.color = "green";

  // Clear form

  contactForm.reset();
});
