// ============================================
// COBOLD POS — Auto-scroll bottom nav ke active item
// Taruh sebelum </body> di semua HTML: <script src="nav-scroll.js"></script>
// ============================================

(function() {
  'use strict';

  function scrollToActive() {
    const bar = document.querySelector('.bn-bar');
    const active = document.querySelector('.bn-item.active');
    if (!bar || !active) return;

    const barRect = bar.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    // Kalau active item kelewat kanan viewport — scroll ke kanan
    if (activeRect.right > barRect.right - 8) {
      bar.scrollTo({
        left: active.offsetLeft - bar.offsetWidth + active.offsetWidth + 24,
        behavior: 'smooth'
      });
    }
    // Kalau active item kelewat kiri — scroll ke kiri
    else if (activeRect.left < barRect.left + 8) {
      bar.scrollTo({
        left: active.offsetLeft - 24,
        behavior: 'smooth'
      });
    }
  }

  // Jalankan pas load halaman
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scrollToActive);
  } else {
    scrollToActive();
  }

  // Jalankan ulang pas resize
  window.addEventListener('resize', scrollToActive);

  // Observer buat ngecek kalau admin-only nav baru muncul (dari JS auth)
  const bar = document.querySelector('.bn-bar');
  if (bar) {
    const observer = new MutationObserver(function(mutations) {
      let shouldScroll = false;
      mutations.forEach(function(m) {
        if (m.type === 'attributes' && m.attributeName === 'style') {
          shouldScroll = true;
        }
        if (m.type === 'childList') {
          shouldScroll = true;
        }
      });
      if (shouldScroll) {
        // Delay dikit biar layout stabil dulu
        setTimeout(scrollToActive, 100);
      }
    });
    observer.observe(bar, { childList: true, subtree: true, attributes: true });
  }
})();