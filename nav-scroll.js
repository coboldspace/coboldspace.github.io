// ============================================
// COBOLD POS — Auto-scroll + center nav items
// ============================================

(function() {
  'use strict';

  function adjustNav() {
    const nav = document.querySelector('.bottom-nav');
    const bar = document.querySelector('.bn-bar');
    const active = document.querySelector('.bn-item.active');
    if (!nav || !bar || !active) return;

    // Hitung jumlah visible item
    const visibleItems = bar.querySelectorAll('.bn-item:not([style*="display: none"])');
    
    // Kalau item ≤ 3, center them. Kalau > 3, flex-start (scrollable)
    if (visibleItems.length <= 3) {
      bar.style.justifyContent = 'center';
      bar.style.minWidth = 'auto';
    } else {
      bar.style.justifyContent = 'flex-start';
      bar.style.minWidth = 'max-content';
    }

    // Auto-scroll ke active item
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