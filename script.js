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
