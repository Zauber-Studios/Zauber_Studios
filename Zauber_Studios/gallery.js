document.addEventListener('DOMContentLoaded', () => {
  const images = [
    'img/Planety/Planety1.png',
    'img/Planety/Planety2.png',
    'img/Planety/Planety3.png',
    'img/Planety/Planety4.png',
    'img/Planety/Planety5.png',
  ];

  let currentIndex = 0;

  const thumb = document.querySelector('.planety-thumb');
  const openBtn = document.querySelector('.planety-open');
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const caption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!thumb || !lightbox) return;

  function updateThumb() {
    thumb.src = images[currentIndex];
    thumb.dataset.index = currentIndex;
  }

  function openLightbox(index) {
    currentIndex = (index + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
    lightboxImage.alt = `Planety ${currentIndex + 1}`;
    caption.textContent = `${currentIndex + 1}/${images.length}`;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex];
    caption.textContent = `${currentIndex + 1}/${images.length}`;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
    caption.textContent = `${currentIndex + 1}/${images.length}`;
  }

  // Initialize thumb
  updateThumb();

  // Open from thumbnail or button
  thumb.addEventListener('click', () => openLightbox(Number(thumb.dataset.index) || 0));
  if (openBtn) openBtn.addEventListener('click', () => openLightbox(Number(thumb.dataset.index) || 0));

  // Controls
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close when clicking outside inner area
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
});
