// Sphere landing page — modal handling for "Schedule a call".

(function () {
  const openTriggers = document.querySelectorAll('[data-modal-open]');
  const closeTriggers = document.querySelectorAll('[data-modal-close]');
  let activeModal = null;

  function openModal(modal) {
    const iframe = modal.querySelector('iframe[data-src]');
    if (iframe && !iframe.src) {
      iframe.src = iframe.dataset.src;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    activeModal = modal;
  }

  function closeModal(modal) {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModal = null;
  }

  openTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modalOpen);
      if (modal) openModal(modal);
    });
  });

  closeTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = trigger.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeModal) {
      closeModal(activeModal);
    }
  });
})();

// Mobile scale-to-fit — below 1300px we don't restructure the layout, we
// shrink the same 1300px-wide desktop composition to fit the viewport so
// mobile matches the web design exactly (see styles.css "scale-to-fit").
(function () {
  const FRAME_WIDTH = 1300;
  const outer = document.getElementById('scale-outer');
  const frame = document.getElementById('scale-frame');
  if (!outer || !frame) return;

  function apply() {
    const vw = window.innerWidth;
    if (vw >= FRAME_WIDTH) {
      frame.classList.remove('is-scaled');
      frame.style.transform = '';
      outer.style.height = '';
      return;
    }
    frame.classList.add('is-scaled');
    const scale = vw / FRAME_WIDTH;
    frame.style.transform = `scale(${scale})`;
    outer.style.height = `${frame.offsetHeight * scale}px`;
  }

  apply();
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', apply);
  window.addEventListener('load', apply);
})();
