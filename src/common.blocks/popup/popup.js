import togglePopup from '../utils/togglePopup';

const popups = document.querySelectorAll('.js-get-booking-popup');
const popupsWrapper = document.querySelectorAll('.js-booking-popup');

if (popups.length > 0 && popupsWrapper.length > 0) {
  const closePopupButtons = document.querySelectorAll('.js-close-popup');
  const headerEl = document.querySelector('.js-header');
  const bodyEl = document.body;

  togglePopup(popups, popupsWrapper, closePopupButtons, bodyEl, headerEl);
}
