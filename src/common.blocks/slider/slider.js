
if (document.querySelector('.js-swiper') !== null) {
  document.querySelectorAll('.js-swiper').forEach((n) => {
    // eslint-disable-next-line no-unused-vars
    const benefitsSwiper = new Swiper(n.querySelector('.js-benefits-swiper'), {
      effect: 'fade',
      pagination: {
        el: n.querySelector('.js-benefits-pagination'),
      },
      navigation: {
        nextEl: '.js-benefits-next',
        prevEl: '.js-benefits-prev',
      },
      slidesPerView: 1,
      spaceBetween: 0,
    });
  });
}

