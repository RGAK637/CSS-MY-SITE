// ===================================
// Typing Animation
// ===================================
const typingTexts = [
  "Full Stack Developer",
  "Problem Solver",
  "Tech Enthusiast",
  "Creative Thinker",
  "Programmer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
  }

  setTimeout(typeText, typingSpeed);
}

// ===================================
// Mobile Navigation Toggle
// ===================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });
}

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add scrolled class when page is scrolled
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  updateActiveNavLink();

  lastScroll = currentScroll;
});

// ===================================
// Update Active Navigation Link
// ===================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.pageYOffset + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===================================
// Intersection Observer for Fade-in Animations
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all fade-in elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
  observer.observe(element);
});

// ===================================
// Skill Progress Bar Animation
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
          bar.style.width = progress + '%';
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// ===================================
// Counter Animation for Stats
// ===================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateCounter(stat, target);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about-section');
if (aboutSection) {
  statsObserver.observe(aboutSection);
}

// ===================================
// Parallax Effect for Clouds
// ===================================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const topCloud = document.querySelector('.top-cloud');
  const bottomCloud = document.querySelector('.bottom-cloud');

  if (topCloud) {
    topCloud.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
  if (bottomCloud) {
    bottomCloud.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// ===================================
// Dynamic Year in Footer
// ===================================
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ===================================
// Project Card Click Interaction
// ===================================
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Only trigger if not clicking the project link
    if (!e.target.classList.contains('project-link')) {
      const link = card.querySelector('.project-link');
      if (link) {
        link.click();
      }
    }
  });
});

// ===================================
// Add ripple effect to buttons
// ===================================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ===================================
// Keyboard Navigation Accessibility
// ===================================
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// ===================================
// Lazy Loading Images (if needed in future)
// ===================================
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ===================================
// Page Load Performance
// ===================================
window.addEventListener('load', () => {
  // Add loaded class to body for any load-dependent animations
  document.body.classList.add('loaded');

  // Start typing animation after page load
  setTimeout(() => {
    typeText();
  }, 500);

  // Log performance metrics (optional, can be removed in production)
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  }
});

// ===================================
// Prevent scroll when mobile menu is open
// ===================================
const body = document.body;
let scrollPosition = 0;

navToggle?.addEventListener('click', () => {
  if (navMenu.classList.contains('active')) {
    scrollPosition = window.pageYOffset;
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.width = '100%';
  } else {
    body.style.removeProperty('overflow');
    body.style.removeProperty('position');
    body.style.removeProperty('top');
    body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition);
  }
});

// ===================================
// Contact Form Validation (if form is added later)
// ===================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ===================================
// Theme Toggle (Future Enhancement)
// ===================================
function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Load saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// ===================================
// Console Message
// ===================================
console.log('%c👋 Welcome to my Portfolio!', 'color: #ffd700; font-size: 20px; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'color: #ffffff; font-size: 14px;');
console.log('%cEmail: rgak2002@gmail.com', 'color: #ffd700; font-size: 14px;');

// ===================================
// Service Worker Registration (Progressive Web App - Future Enhancement)
// ===================================
if ('serviceWorker' in navigator) {
  // Uncomment when service worker is created
  // navigator.serviceWorker.register('/sw.js')
  //   .then(registration => console.log('Service Worker registered'))
  //   .catch(error => console.log('Service Worker registration failed:', error));
}

// ===================================
// Analytics Event Tracking (if Google Analytics is added)
// ===================================
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

// Track CTA button clicks
buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonText = button.textContent;
    trackEvent('CTA', 'click', buttonText);
  });
});

// Track external link clicks
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const linkHref = link.href;
    trackEvent('External Link', 'click', linkHref);
  });
});

// ===================================
// Scroll to Top Functionality (Future Enhancement)
// ===================================
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    if (window.pageYOffset > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  }
});

// ===================================
// Handle reduced motion preference
// ===================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--transition-fast', '0.01ms');
  document.documentElement.style.setProperty('--transition-normal', '0.01ms');
  document.documentElement.style.setProperty('--transition-slow', '0.01ms');
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio initialized successfully! 🚀');

  // Add any additional initialization code here
  updateActiveNavLink();
});
