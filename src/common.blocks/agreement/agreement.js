const agreementAnchors = $('.js-agreement-anchor');

function scrollToBlock(e) {
  e.preventDefault();
  const href = $(this).attr('href');
  const hrefHeight = $(this).height();
  const headerHeight = $('.js-header').height();
  const offset = $(href).offset().top - (hrefHeight + headerHeight);

  $('body,html').animate({
    scrollTop: offset,
  }, 500);
}

agreementAnchors.on('click', scrollToBlock);
