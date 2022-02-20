import togglePopup from '../utils/togglePopup';

const galleryItems = document.querySelectorAll('.js-gallery-item');
const galleryPopups = document.querySelectorAll('.js-gallery-popup');

if (galleryItems.length > 0 && galleryPopups.length > 0) {
  const closePopupButtons = document.querySelectorAll('.js-close-popup');
  const headerEl = document.querySelector('.js-header');
  const bodyEl = document.body;

  togglePopup(galleryItems, galleryPopups, closePopupButtons, bodyEl, headerEl);
}

