import togglePopup from '../utils/togglePopup';

const galleryItems = document.querySelectorAll('.js-get-booking-popup');
const galleryPopups = document.querySelectorAll('.js-booking-popup');

if (galleryItems.length > 0 && galleryPopups.length > 0) {
  const closePopupButtons = document.querySelectorAll('.js-close-popup');
  const headerEl = document.querySelector('.js-header');
  const bodyEl = document.body;

  togglePopup(galleryItems, galleryPopups, closePopupButtons, bodyEl, headerEl);
}
