const tabBtn = $('.js-trace-link');

if (tabBtn) {
  // eslint-disable-next-line func-names
  tabBtn.on('click', function (e) {
    e.preventDefault();
    const href = $(this).attr('href');

    $('.js-trace-frame').removeClass('is-active');
    $('.js-trace-link').parent('.trace__item').removeClass('is-active');

    console.log($(href));
    $(this).parent('.trace__item').addClass('is-active');
    $(href).addClass('is-active');
  });
}
