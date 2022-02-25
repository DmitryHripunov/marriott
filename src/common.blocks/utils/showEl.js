function showEl(toggle, content, body, header = null, focus = null) {
  toggle.setAttribute('aria-expanded', true);
  content.setAttribute('aria-hidden', false);

  body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  if (header) header.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  content.classList.add('is-opened');
  toggle.classList.add('is-active');
  if (focus) focus.focus();
  body.classList.add('no-scrolling');
}

export default showEl;
