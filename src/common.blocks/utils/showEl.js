function showEl(toggle, content, body, focus = null) {
  toggle.setAttribute('aria-expanded', true);
  content.setAttribute('aria-hidden', false);

  body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  body.classList.add('no-scrolling');
  toggle.classList.add('is-active');
  content.classList.add('is-opened');
  if (focus) focus.focus();
}

export default showEl;
