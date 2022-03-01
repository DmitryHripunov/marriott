
if (document.querySelector('.js-swiper') !== null) {
  document.querySelectorAll('.js-swiper').forEach((n) => {
    // eslint-disable-next-line no-unused-vars
    const benefitsSwiper = new Swiper(n.querySelector('.js-swiper-container'), {
      effect: 'fade',
      pagination: {
        el: n.querySelector('.js-swiper-pagination'),
      },
      navigation: {
        nextEl: '.js-swiper-next',
        prevEl: '.js-swiper-prev',
      },
      slidesPerView: 1,
      spaceBetween: 0,
    });
  });
  document.querySelectorAll('.js-swiper-row').forEach((n) => {
    // eslint-disable-next-line no-unused-vars
    const benefitsSwiper = new Swiper(n.querySelector('.js-swiper-container'), {
      pagination: {
        el: n.querySelector('.js-swiper-pagination'),
      },
      navigation: {
        nextEl: '.js-swiper-next',
        prevEl: '.js-swiper-prev',
      },
      slidesPerView: 4,
      spaceBetween: 32,
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 0,
        },

        768: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });
  });
}

