function hideEl(toggle, content, body) {
  toggle.setAttribute('aria-expanded', false);
  content.setAttribute('aria-hidden', true);

  if (toggle.classList.contains('is-active')) {
    body.classList.remove('no-scrolling');
    body.style.paddingRight = '';
    toggle.classList.remove('is-active');
    content.classList.remove('is-opened');
  }
}

export default hideEl;
