/**
 * Personal Profile Website Interactions
 * Includes: Theme Toggle, Typewriter Animation, Mobile Menu, Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('profile-theme');

  if (savedTheme) {
    body.className = savedTheme;
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('profile-theme', 'light-theme');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('profile-theme', 'dark-theme');
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking any nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 4. Typewriter Animation for Subtitle
  const typewriterElement = document.getElementById('typewriter-text');
  const phrases = [
    'Tech Enthusiast & Problem Solver',
    'AI & Automation Explorer',
    'No-Code & Web Innovator',
    'Lifelong Curious Learner'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function typeLoop() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 1600; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before new phrase
    }

    setTimeout(typeLoop, typingSpeed);
  }

  if (typewriterElement) {
    setTimeout(typeLoop, 800);
  }

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-list a[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  });

  // 6. Contact Form Interactive Feedback
  const contactForm = document.getElementById('profile-contact-form');
  const toastMessage = document.getElementById('toast-message');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && toastMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple visual submission state
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();

        toastMessage.classList.add('show');
        setTimeout(() => {
          toastMessage.classList.remove('show');
        }, 5000);
      }, 1000);
    });
  }
});
