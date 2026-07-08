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

// Mobile carousels — click-to-scroll arrows for the framework and
// investor card carousels, with disabled state at either end.
(function () {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const prevBtn = carousel.querySelector('.carousel-arrow--prev');
    const nextBtn = carousel.querySelector('.carousel-arrow--next');
    if (!track || !prevBtn || !nextBtn) return;

    function scrollAmount() {
      const card = track.firstElementChild;
      if (!card) return track.clientWidth;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      return card.getBoundingClientRect().width + gap;
    }

    // Scroll-snap settles the resting position at the track's left
    // padding rather than 0, so capture that as the "start" baseline
    // instead of assuming 0.
    let minScroll = track.scrollLeft;

    function updateDisabled() {
      const maxScroll = track.scrollWidth - track.clientWidth - 1;
      prevBtn.classList.toggle('is-disabled', track.scrollLeft <= minScroll + 1);
      nextBtn.classList.toggle('is-disabled', track.scrollLeft >= maxScroll);
    }

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', updateDisabled, { passive: true });
    window.addEventListener('resize', updateDisabled);
    setTimeout(() => {
      minScroll = Math.min(minScroll, track.scrollLeft);
      updateDisabled();
    }, 100);
    updateDisabled();
  });
})();
