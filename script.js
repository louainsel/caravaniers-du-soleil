const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Image lightbox: works both on the dedicated gallery and on clickable images in the main site.
const lightbox = document.querySelector('.lightbox');
if (lightbox) {
  const lbImg = lightbox.querySelector('img');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const close = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  };

  const openImage = (img, captionText = '') => {
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = captionText;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden','false');
  };

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const cap = item.querySelector('figcaption');
      openImage(img, cap ? cap.innerText.replace(/\n/g,' — ') : '');
    });
  });

  document.querySelectorAll('.zoomable-image').forEach(button => {
    button.addEventListener('click', () => {
      const img = button.querySelector('img');
      const figure = button.closest('figure');
      const cap = figure ? figure.querySelector('figcaption') : null;
      openImage(img, cap ? cap.innerText : '');
    });
  });

  const closeButton = lightbox.querySelector('.lightbox-close');
  if (closeButton) closeButton.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) close(); });
}

// Portrait cards open a text-only detail panel rather than enlarging the portrait.
const portraitModal = document.querySelector('.portrait-modal');
if (portraitModal) {
  const title = portraitModal.querySelector('#portrait-modal-title');
  const role = portraitModal.querySelector('.portrait-modal-role');
  const description = portraitModal.querySelector('.portrait-modal-description');
  const closeButton = portraitModal.querySelector('.portrait-modal-close');

  const closePortrait = () => {
    portraitModal.classList.remove('open');
    portraitModal.setAttribute('aria-hidden','true');
  };

  document.querySelectorAll('.face[data-face-title]').forEach(face => {
    face.addEventListener('click', () => {
      title.textContent = face.dataset.faceTitle || '';
      role.textContent = face.dataset.faceRole || '';
      description.innerHTML = '';
      (face.dataset.faceDescription || '').split('||').filter(Boolean).forEach(text => {
        const p = document.createElement('p');
        p.textContent = text.trim();
        description.appendChild(p);
      });
      portraitModal.classList.add('open');
      portraitModal.setAttribute('aria-hidden','false');
    });
  });

  closeButton.addEventListener('click', closePortrait);
  portraitModal.addEventListener('click', e => { if (e.target === portraitModal) closePortrait(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && portraitModal.classList.contains('open')) closePortrait(); });
}
