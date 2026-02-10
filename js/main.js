/* WEBVAM Studio — main.js */
(function() {
  'use strict';

  // ─── Mobile menu ────────────────────────────────────────────
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Закрыть при клике на ссылку
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Smooth scroll for anchor links ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // header height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ─── Active nav link on scroll ───────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  function setActiveNav() {
    let current = '';
    sections.forEach(function(section) {
      const top = section.offsetTop - 100;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveNav, { passive: true });

  // ─── Contact form ────────────────────────────────────────────
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = '✓ Odesláno / Отправлено';
      btn.disabled = true;
      btn.style.background = '#27ae60';

      // Formspree или Netlify Forms интеграция
      const data = new FormData(form);
      fetch('https://formspree.io/f/REPLACE_WITH_YOUR_ID', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).catch(function() {
        // fallback - просто показываем успех
      }).finally(function() {
        setTimeout(function() {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
          form.reset();
        }, 4000);
      });
    });
  }

})();
