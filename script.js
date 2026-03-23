// Navigation scroll effect
const nav = document.querySelector('.nav');
const navOffset = nav.offsetTop;

function handleNavScroll() {
  if (window.scrollY > navOffset) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - nav.offsetHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

// Add reveal class to elements that should animate
const elementsToReveal = [
  '.stats',
  '.services__header',
  '.service-card',
  '.about__content',
  '.gallery__header',
  '.gallery__item',
  '.testimonials__title',
  '.testimonial-card',
  '.contact__title',
  '.contact__cards',
  '.contact__form'
];

elementsToReveal.forEach(selector => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(element);
  });
});

// Form handling
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Appointment Request - ${service}`);
    const body = encodeURIComponent(`
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Message: ${message || 'No additional message'}

Please contact me to schedule an appointment.
    `);
    
    const mailtoLink = `mailto:chantillecampbell@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    
    // Show success message
    const submitBtn = this.querySelector('.btn--primary');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Message Sent!';
    submitBtn.style.background = '#28a745';
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      this.reset();
    }, 3000);
  });
}

// Gallery image hover effects
const galleryItems = document.querySelectorAll('.gallery__item');
galleryItems.forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(-4px) scale(1)';
  });
});

// Service card interactions
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-12px)';
    this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '';
  });
});

// Phone number click tracking
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Track phone clicks (can be connected to analytics)
    console.log('Phone number clicked:', this.href);
  });
});

// Testimonial card staggered animation on scroll
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialObserver = new IntersectionObserver(function(entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 200);
    }
  });
}, observerOptions);

testimonialCards.forEach(card => {
  card.classList.add('reveal');
  testimonialObserver.observe(card);
});

// Parallax effect for hero background
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero__image');
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Stats counter animation
const statsNumbers = document.querySelectorAll('.stats__number');
const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalText = target.textContent;
      
      // Only animate if it contains numbers
      if (finalText.match(/\d/)) {
        const finalNumber = parseInt(finalText.match(/\d+/)[0]);
        let current = 0;
        const increment = finalNumber / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= finalNumber) {
            target.textContent = finalText;
            clearInterval(timer);
          } else {
            target.textContent = finalText.replace(/\d+/, Math.floor(current));
          }
        }, 40);
      }
      
      statsObserver.unobserve(target);
    }
  });
}, observerOptions);

statsNumbers.forEach(number => {
  statsObserver.observe(number);
});