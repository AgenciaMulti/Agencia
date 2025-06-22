// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});

// Efecto scroll header
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Menú hamburguesa
const menuBtn = document.getElementById('menu-toggle');
const navMenu = document.querySelector('nav ul');
if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Scroll reveal animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    } else {
      entry.target.classList.remove('reveal');
    }
  });
}, { threshold: 0.1 });


document.querySelectorAll('section, .grid-portafolio img').forEach(el => {
  observer.observe(el);
});

const revealEls = [...document.querySelectorAll('section, .grid-portafolio img, .reveal-text')];
revealEls.forEach((el, index) => {
  el.style.transitionDelay = `${index * 10}ms`;
  observer.observe(el);
});

// Sticky header con scroll
  window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    header.classList.toggle('scrolled', window.scrollY > 10);
  });

  // Menu toggle responsive
  document.getElementById('menu-toggle').addEventListener('click', () => {
    const navList = document.querySelector('nav ul');
    navList.classList.toggle('show');
  });

  // GSAP: animación del logo al cargar
  gsap.from(".logo img", {
    duration: 0.5,
    y: -40,
    opacity: 0,
    ease: "power3.out"
  });

  // GSAP: animación de cada ítem del menú principal
  gsap.from("nav ul li", {
    duration: 0.5,
    y: -20,
    opacity: 0,
    stagger: 0.15,
    delay: 0.5,
    ease: "power2.out"
  });

  // GSAP: animación del botón de menú (modo responsive)
  gsap.from("#menu-toggle", {
    duration: 0.5,
    scale: 0,
    opacity: 0,
    delay: 0.5,
    ease: "back.out(1.7)"
  });
