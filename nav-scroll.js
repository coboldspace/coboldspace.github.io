// ============================================
// COBOLD POS — Auto-scroll bottom nav ke active item
// Taruh sebelum </body> di semua HTML: <script src="nav-scroll.js"></script>
// ============================================

(function() {
  'use strict';

  function scrollToActive() {
    const nav = document.querySelector('.bottom-nav');
    const active = document.querySelector('.bn-item.active');
    if (!nav || !active) return;

    const navRect = nav.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    // Scroll ke kanan: posisi active item - lebar nav + lebar item + padding
    const scrollRight = active.offsetLeft - nav.offsetWidth + active.offsetWidth + 24;

    if (activeRect.right > navRect.right - 8) {
      nav.scrollTo({ left: scrollRight, behavior: 'smooth' });
    }
    else if (activeRect.left < navRect.left + 8) {
      nav.scrollTo({ left: active.offsetLeft - 24, behavior: 'smooth' });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scrollToActive);
  } else {
    scrollToActive();
  }

  window.addEventListener('resize', scrollToActive);

  const nav = document.querySelector('.bottom-nav');
  if (nav) {
    const observer = new MutationObserver(() => {
      setTimeout(scrollToActive, 150);
    });
    observer.observe(nav, { childList: true, subtree: true, attributes: true });
  }
})();