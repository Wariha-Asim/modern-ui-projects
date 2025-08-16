// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Simple front-end validation for contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    const show = (id, show) => {
      const el = form.querySelector(`[data-error-for="${id}"]`);
      if (el) el.classList.toggle('hidden', !show);
    };

    if (!name.value.trim()) { show('name', true); valid = false; } else show('name', false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { show('email', true); valid = false; } else show('email', false);
    if (message.value.trim().length < 5) { show('message', true); valid = false; } else show('message', false);

    const status = document.getElementById('formStatus');
    if (valid) {
      status.classList.remove('sr-only');
      status.textContent = 'Thank you! Your message was captured locally (no backend in this demo).';
      form.reset();
      setTimeout(() => status.classList.add('sr-only'), 4000);
    }
  });
}

// Highlight active nav link
const path = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navlink').forEach(link => {
  const href = link.getAttribute('href');
  if (href && href.endsWith(path)) {
    link.classList.add('text-brand-blue');
  }
});
