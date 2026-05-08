/* ================================================================
   co.bold space — script.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── CUSTOM CURSOR ─────────────────────────────────────────
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');

  if (cursor && cursorTrail && window.innerWidth > 768) {
    let trailX = 0, trailY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    // Smooth trailing animation
    function animateTrail() {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top  = trailY + 'px';
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effect on interactive elements
    const hoverEls = document.querySelectorAll('a, button, .menu-item, .gallery-item');
    hoverEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '20px';
        cursor.style.height = '20px';
        cursorTrail.style.width  = '56px';
        cursorTrail.style.height = '56px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '10px';
        cursor.style.height = '10px';
        cursorTrail.style.width  = '36px';
        cursorTrail.style.height = '36px';
      });
    });
  }

  // ─── NAVBAR SCROLL ─────────────────────────────────────────
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ─── HAMBURGER / MOBILE MENU ────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ─── REVEAL ON SCROLL ──────────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for siblings
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const index    = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ─── MENU TABS ─────────────────────────────────────────────
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.menu-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.querySelector(`[data-content="${target}"]`);
      if (activeContent) {
        activeContent.classList.add('active');

        // Re-trigger reveal for newly visible items
        const newItems = activeContent.querySelectorAll('.reveal');
        newItems.forEach((item, i) => {
          item.classList.remove('visible');
          item.style.transitionDelay = `${i * 0.08}s`;
          setTimeout(() => {
            item.classList.add('visible');
          }, 50);
        });
      }
    });
  });

  // ─── COUNTER ANIMATION ─────────────────────────────────────
  const statNums = document.querySelectorAll('.stat-num');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 1800;
        const step   = target / (duration / 16);
        let current  = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 16);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(num => counterObserver.observe(num));

  // ─── SMOOTH SCROLL WITH OFFSET ─────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();

      const offset = 80; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── PARALLAX: HERO BG CIRCLES ─────────────────────────────
  const circles = document.querySelectorAll('.hero-circle');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    circles.forEach((c, i) => {
      const speed = (i + 1) * 0.15;
      c.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // ─── GALLERY ITEM: TILT EFFECT (Desktop) ───────────────────
  if (window.innerWidth > 768) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect   = item.getBoundingClientRect();
        const x      = (e.clientX - rect.left) / rect.width  - 0.5;
        const y      = (e.clientY - rect.top)  / rect.height - 0.5;
        item.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
        item.style.zIndex    = '10';
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
        item.style.zIndex    = '';
      });
    });
  }

  // ─── ACTIVE NAV LINK ON SCROLL ─────────────────────────────
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--gold)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeLinkObserver.observe(s));

  // ─── MENU ITEM: GOLD HOVER LINE ─────────────────────────────
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.borderLeftColor = 'var(--gold)';
      item.style.borderLeftWidth = '3px';
      item.style.paddingLeft     = '21px';
    });
    item.addEventListener('mouseleave', () => {
      item.style.borderLeftColor = '';
      item.style.borderLeftWidth = '';
      item.style.paddingLeft     = '';
    });
  });

  // ─── PAGE LOAD: FADE IN BODY ───────────────────────────────
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);

  // ─── INITIAL REVEAL TRIGGER ───────────────────────────────
  // Trigger reveal for elements already in view
  setTimeout(() => {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
      }
    });
  }, 300);

});
