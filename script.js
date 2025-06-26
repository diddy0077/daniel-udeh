gsap.from(".hero-title", { opacity: 0, y: -50, duration: 1 });
gsap.from(".hero-subtitle", { opacity: 0, y: 30, delay: 0.5, duration: 1 });
gsap.from(".hero-btn", { opacity: 0, scale: 0.9, delay: 1, duration: 0.6 });


const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const selectedType = btn.dataset.type;

    // Step 1: Fade out all cards
    gsap.to(projects, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        // Step 2: Hide or show cards based on filter
        projects.forEach((card) => {
          const cardType = card.dataset.type;
          if (selectedType === "all" || cardType === selectedType) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });

        // Step 3: Fade in visible cards
        const visibleCards = Array.from(projects).filter(
          (card) => card.style.display === "block"
        );

        gsap.fromTo(
          visibleCards,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }
        );
      },
    });
  });
});

// Select all project cards
const cards = document.querySelectorAll(".project-card");

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.05,
      y: -10,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      y: 0,
      boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.inOut",
    });
  });
});


cards.forEach((card) => {
  const tiltX = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power2.out" });
  const tiltY = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power2.out" });

  card.addEventListener("mousemove", (e) => {
    const bounds = card.getBoundingClientRect();
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const deltaX = (mouseX - centerX) / centerX;
    const deltaY = (mouseY - centerY) / centerY;

    // Max 15deg tilt
    tiltX(deltaX * 15);
    tiltY(-deltaY * 15);
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  });
});

cards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      boxShadow: "0 0 15px #6366f1, 0 0 30px rgba(99, 102, 241, 0.5)",
      duration: 0.4,
      ease: "power2.out"
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      duration: 0.4,
      ease: "power2.inOut"
    });
  });
});

const cursor = document.querySelector(".cursor");

window.addEventListener("mousemove", (e) => {
  cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
});

const spotlight = document.querySelector('.spotlight-overlay');

window.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  spotlight.style.background = `
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(99, 102, 241, 0.15) 120px,
      rgba(255, 255, 255, 0.3) 300px
    )
  `;
});


  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  function validateName() {
    const name = nameInput.value.trim();
    if (name.length < 3) {
      nameInput.style.borderColor = "#f87171";
      nameError.textContent = "Name must be at least 3 characters.";
      nameError.style.display = "block";
      return false;
    }
    nameInput.style.borderColor = "#34d399";
    nameError.style.display = "none";
    return true;
  }

  function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      emailInput.style.borderColor = "#f87171";
      emailError.textContent = "Please enter a valid email.";
      emailError.style.display = "block";
      return false;
    }
    emailInput.style.borderColor = "#34d399";
    emailError.style.display = "none";
    return true;
  }

  function validateMessage() {
    const message = messageInput.value.trim();
    if (message.length < 10) {
      messageInput.style.borderColor = "#f87171";
      messageError.textContent = "Message must be at least 10 characters.";
      messageError.style.display = "block";
      return false;
    }
    messageInput.style.borderColor = "#34d399";
    messageError.style.display = "none";
    return true;
  }

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);




document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const validName = validateName();
  const validEmail = validateEmail();
  const validMessage = validateMessage();
  const responseMsg = document.getElementById("form-response");

  if (!validName || !validEmail || !validMessage) {
    responseMsg.textContent = "❌ Please fix the errors before submitting.";
    responseMsg.classList.remove("success");
    responseMsg.classList.add("error");
    return;
  }

  // Simulate success (you'll replace this with real Formspree/EmailJS call later)
  responseMsg.textContent = "✅ Message sent successfully!";
  responseMsg.classList.remove("error");
  responseMsg.classList.add("success");

  // Optionally clear form
  document.getElementById("contact-form").reset();
  nameInput.style.borderColor = "";
  emailInput.style.borderColor = "";
  messageInput.style.borderColor = "";
});



  
 // Hamburger menu toggle
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Smooth scroll + active link
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const targetWidth = fill.getAttribute("data-width");
        fill.style.width = targetWidth;
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".progress-fill").forEach(fill => {
    observer.observe(fill);
  });

   const counters = document.querySelectorAll(".counter-box h3");
  let started = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const step = Math.ceil(target / 100);
      const update = () => {
        count += step;
        if (count > target) count = target;
        counter.textContent = count;
        if (count < target) requestAnimationFrame(update);
      };
      update();
    });
  };

  const daniel = new IntersectionObserver(entries => {
    if (!started && entries.some(entry => entry.isIntersecting)) {
      started = true;
      animateCounters();
    }
  }, { threshold: 0.5 });

  counters.forEach(counter => daniel.observe(counter));