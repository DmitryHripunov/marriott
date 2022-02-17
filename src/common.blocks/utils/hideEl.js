function hideEl(toggle, content, body, header = null) {
  toggle.setAttribute('aria-expanded', false);
  content.setAttribute('aria-hidden', true);

  if (toggle.classList.contains('is-active')) {
    body.classList.remove('no-scrolling');
    body.style.paddingRight = '';
    if (header) header.style.paddingRight = '';
    content.classList.remove('is-opened');
    toggle.classList.remove('is-active');
  }
}

export default hideEl;
