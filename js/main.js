/* WEBVAM Studio — main.js */
(function() {
  'use strict';

  // ─── Mobile menu ────────────────────────────────────────────
  const toggle = document.querySelector('.menu-toggle');
  const nav    = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function() {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      // Анимация гамбургера
      toggle.classList.toggle('is-open', open);
    });
    // Закрыть при клике на ссылку
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
    // Закрыть при клике вне меню
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      }
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
      var btn = form.querySelector('[type="submit"]');
      var original = btn.textContent;
      var successText = form.dataset.success || '✓ Sent';
      var errorText = form.dataset.error || 'Error. Try again.';
      btn.disabled = true;

      var data = new FormData(form);
      fetch('https://formspree.io/f/xeelegek', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          btn.textContent = successText;
          btn.style.background = '#27ae60';
          form.reset();
        } else {
          btn.textContent = errorText;
          btn.style.background = '#e74c3c';
        }
      }).catch(function() {
        btn.textContent = errorText;
        btn.style.background = '#e74c3c';
      }).finally(function() {
        setTimeout(function() {
          btn.textContent = original;
          btn.disabled = false;
          btn.style.background = '';
        }, 4000);
      });
    });
  }

})();
