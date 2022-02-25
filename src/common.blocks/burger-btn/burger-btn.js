import showEl from '../utils/showEl';
import hideEl from '../utils/hideEl';

const burgerBtn = document.querySelector('.js-burger-btn');
const navContent = document.querySelector('.js-nav');
const header = document.querySelector('.js-header-wrapper');
const close = document.querySelector('.js-close');
const bodyEl = document.body;

if (burgerBtn) {
  burgerBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    // eslint-disable-next-line no-unused-expressions
    JSON.parse(burgerBtn.getAttribute('aria-expanded'))
      ? hideEl(burgerBtn, navContent, bodyEl, header)
      : showEl(burgerBtn, navContent, bodyEl, header);
  });

  const handleClosure = event =>
    !navContent.contains(event.target) && hideEl(burgerBtn, navContent, bodyEl, header);

  close.addEventListener('click', () => {
    hideEl(burgerBtn, navContent, bodyEl, header);
  });

  window.addEventListener('click', handleClosure);
  window.addEventListener('focusin', handleClosure);
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 1024) {
    hideEl(burgerBtn, navContent, bodyEl, header);
  }
});

