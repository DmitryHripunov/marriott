const agreementAnchors = $('.js-agreement-anchor');

// if (agreementAnchors.length) {
//   agreementAnchors.forEach((anchor) => {
//     anchor.addEventListener('click', (e) => {
//       const current = e.currentTarget();
//       console.log(current);
//     });
//   });
// }

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
