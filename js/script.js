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

// Scroll suave
for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

// Sticky header
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// Toggle menú móvil funcional
const toggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
toggle.addEventListener('click', () => {
  navList.classList.toggle('show');
});

document.querySelectorAll('.has-submenu > a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const li = link.parentElement;
    const submenu = link.nextElementSibling;

    // Toggle actual
    submenu.classList.toggle('open');
    li.classList.toggle('open');

    // Cerrar otros submenús
    document.querySelectorAll('.has-submenu').forEach(other => {
      if (other !== li) {
        other.classList.remove('open');
        const otherMenu = other.querySelector('.submenu');
        if (otherMenu) otherMenu.classList.remove('open');
      }
    });
  });
});

// 🔁 Cerrar submenús y menú hamburguesa al hacer clic fuera
document.addEventListener('click', (e) => {
  const nav = document.querySelector('nav');
  const toggle = document.getElementById('menu-toggle');

  const isClickInsideNav = nav?.contains(e.target) || toggle?.contains(e.target);

  if (!isClickInsideNav) {
    // Ocultar menú principal si está abierto
    document.getElementById('nav-list')?.classList.remove('show');
    toggle?.classList.remove('open');

    // Ocultar submenús
    document.querySelectorAll('.has-submenu').forEach(li => li.classList.remove('open'));
    document.querySelectorAll('.submenu').forEach(sm => sm.classList.remove('open'));
  }
});


// GSAP animaciones
if (typeof gsap !== 'undefined') {
  gsap.from(".logo img", {
    duration: 0.6,
    y: -40,
    opacity: 0,
    ease: "power3.out"
  });

  gsap.from(".nav-list li", {
    duration: 0.5,
    y: -20,
    opacity: 0,
    stagger: 0.1,
    delay: 0.3,
    ease: "power2.out"
  });

  gsap.from("#menu-toggle", {
    duration: 0.4,
    scale: 0,
    opacity: 0,
    delay: 0.5,
    ease: "back.out(1.7)"
  });
  
}

// Cambiar ícono hamburguesa a "X"
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
});



const botonFlotante = document.getElementById('botonContactoFlotante');
const popup = document.getElementById('popupFormulario');
const cerrarBtn = document.getElementById('cerrarPopup');

if (botonFlotante && popup) {
  // Mostrar/Ocultar al hacer clic en el botón flotante
  botonFlotante.addEventListener('click', (e) => {
    e.stopPropagation(); // evita cierre inmediato si haces clic en botón
    popup.classList.toggle('visible');
  });

  // Cerrar al hacer clic en el botón ✕
  if (cerrarBtn) {
    cerrarBtn.addEventListener('click', () => {
      popup.classList.remove('visible');
    });
  }

  // Cerrar al hacer clic fuera del popup
  document.addEventListener('click', (e) => {
    const isClickInsidePopup = popup.contains(e.target);
    const isClickOnBoton = botonFlotante.contains(e.target);

    if (!isClickInsidePopup && !isClickOnBoton && popup.classList.contains('visible')) {
      popup.classList.remove('visible');
    }
  });

  // Prevenir que los clics dentro del popup lo cierren
  popup.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

