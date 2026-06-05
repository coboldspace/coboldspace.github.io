// co.bold space — script.js (Revamped)

document.addEventListener('DOMContentLoaded', () => {

  // ─── CURSOR (desktop only) ─────────────────────────────────
  const cursor = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouch && cursor && cursorTrail) {
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateTrail() {
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top = trailY + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorTrail.style.width = '50px';
        cursorTrail.style.height = '50px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursorTrail.style.width = '36px';
        cursorTrail.style.height = '36px';
      });
    });
  }

  // ─── NAVBAR SCROLL EFFECT ──────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ─── REVEAL ON SCROLL ──────────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => revealObserver.observe(el));

  // ─── MENU TABS ─────────────────────────────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.menu-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.dataset.content === target) {
          content.classList.add('active');
        }
      });
    });
  });

  // ─── COUNTER ANIMATION ─────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current);
          }
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObserver.observe(el));

  // ─── MOBILE BOTTOM NAV ─────────────────────────────────────
  const mobileNav = document.getElementById('mobileBottomNav');
  let navHidden = false;
  let tapTimeout;

  if (mobileNav && window.innerWidth <= 768) {
    // Hide/show on tap anywhere
    document.addEventListener('click', (e) => {
      // Don't trigger if tapping on nav itself
      if (mobileNav.contains(e.target)) return;

      navHidden = !navHidden;
      if (navHidden) {
        mobileNav.classList.add('hidden');
      } else {
        mobileNav.classList.remove('hidden');
      }
    });

    // Also hide on scroll down, show on scroll up
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        mobileNav.classList.add('hidden');
        navHidden = true;
      } else if (currentScrollY < lastScrollY) {
        mobileNav.classList.remove('hidden');
        navHidden = false;
      }
      lastScrollY = currentScrollY;
    });
  }

  // ─── ACTIVE SECTION HIGHLIGHT (mobile nav) ─────────────────
  const sections = document.querySelectorAll('section[id]');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        mobileNavItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === '#' + id) {
            item.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});