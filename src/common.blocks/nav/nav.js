const navBtn = $('.js-dropdown-btn');
const navContent = $('.js-dropdown-content');

if ($(window).width() < 1024) {
  navBtn.on('click', (e) => {
    const curTarget = e.currentTarget;
    const slideItem = $(curTarget).siblings(navContent);
    $(curTarget).toggleClass('is-active');
    slideItem.toggleClass('is-opened');
  });
}
