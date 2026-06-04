// ============================================
// COBOLD POS — Auto-scroll + center nav items
// Taruh sebelum </body>: <script src="nav-scroll.js"></script>
// ============================================

(function() {
  'use strict';

  function adjustNav() {
    const nav = document.querySelector('.bottom-nav');
    const bar = document.querySelector('.bn-bar');
    const active = document.querySelector('.bn-item.active');
    if (!nav || !bar || !active) return;

    // FIX: cek computed style, bukan inline style
    const allItems = bar.querySelectorAll('.bn-item');
    const visibleItems = Array.from(allItems).filter(item => {
      return window.getComputedStyle(item).display !== 'none';
    });

    // FIX: kalau item ≤ 3, center them
    if (visibleItems.length <= 3) {
      bar.style.justifyContent = 'center';
      bar.style.minWidth = 'auto';
      bar.style.width = '100%';
      visibleItems.forEach(item => {
        item.style.flex = '0 0 auto';
        item.style.minWidth = '80px';
      });
    } else {
      bar.style.justifyContent = 'flex-start';
      bar.style.minWidth = 'max-content';
      bar.style.width = '';
      allItems.forEach(item => {
        item.style.flex = '';
        item.style.minWidth = '';
      });
    }

    // Auto-scroll ke active item (hanya kalau > 3 item)
    if (visibleItems.length > 3) {
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();
      const scrollRight = active.offsetLeft - nav.offsetWidth + active.offsetWidth + 24;

      if (activeRect.right > navRect.right - 8) {
        nav.scrollTo({ left: scrollRight, behavior: 'smooth' });
      }
      else if (activeRect.left < navRect.left + 8) {
        nav.scrollTo({ left: active.offsetLeft - 24, behavior: 'smooth' });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustNav);
  } else {
    adjustNav();
  }

  window.addEventListener('resize', adjustNav);

  const nav = document.querySelector('.bottom-nav');
  if (nav) {
    const observer = new MutationObserver(() => {
      setTimeout(adjustNav, 150);
    });
    observer.observe(nav, { childList: true, subtree: true, attributes: true });
  }
})();