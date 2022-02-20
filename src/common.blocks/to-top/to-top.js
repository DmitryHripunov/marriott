$('.js-to-top').click(() => {
  $('html, body').animate({
    scrollTop: 0,
  }, 500);
});

function setTopScroll() {
  const topPos = $('html').scrollTop();
  if (topPos > 100) {
    $('.js-to-top').addClass('is-visible');
  } else {
    $('.js-to-top').removeClass('is-visible');
  }
}

setTopScroll();

$(window).scroll(() => {
  setTopScroll();
});
