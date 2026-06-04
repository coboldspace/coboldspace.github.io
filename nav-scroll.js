// ============================================
// COBOLD POS — Auto-scroll + center nav items (v4)
// Taruh sebelum </body>: <script src="nav-scroll-v4.js"></script>
// ============================================

(function() {
  'use strict';

  let isTouching = false;
  let touchTimeout;

  function adjustNav() {
    const nav = document.querySelector('.bottom-nav');
    const bar = document.querySelector('.bn-bar');
    const active = document.querySelector('.bn-item.active');
    if (!nav || !bar || !active) return;

    // Hitung jumlah visible item (yang ga display:none)
    const visibleItems = bar.querySelectorAll('.bn-item:not([style*="display: none"])');

    // FIX: centering via .bottom-nav class
    if (visibleItems.length <= 3) {
      nav.classList.add('few-items');
    } else {
      nav.classList.remove('few-items');
    }

    // Auto-scroll hanya kalau > 3 item dan user lagi nggak touch
    if (visibleItems.length > 3 && !isTouching) {
      const navRect = nav.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();

      // Kalau active item keluar dari viewport, scroll ke tengah
      if (activeRect.right > navRect.right - 8 || activeRect.left < navRect.left + 8) {
        active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }

  // FIX: touch detection — jangan auto-scroll pas user lagi swipe
  document.addEventListener('touchstart', function() {
    isTouching = true;
    clearTimeout(touchTimeout);
  }, { passive: true });

  document.addEventListener('touchend', function() {
    touchTimeout = setTimeout(function() {
      isTouching = false;
      adjustNav(); // re-check setelah touch selesai
    }, 300);
  }, { passive: true });

  // Jalankan pas DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', adjustNav);
  } else {
    adjustNav();
  }

  window.addEventListener('resize', adjustNav);

  // Observer buat admin-only nav
  const nav = document.querySelector('.bottom-nav');
  if (nav) {
    const observer = new MutationObserver(function() {
      setTimeout(adjustNav, 150);
    });
    observer.observe(nav, { childList: true, subtree: true, attributes: true });
  }
})();