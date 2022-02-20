const togglePopup = (gallery, popups, closeButtons, body, header = null) => {
  gallery.forEach((galleryItem) => {
    const dropDownContent = document.querySelector(galleryItem.dataset.target);

    if (dropDownContent) {
      galleryItem.addEventListener('click', (event) => {
        event.preventDefault();
        // eslint-disable-next-line no-underscore-dangle
        event._isClickWithinDropDown = true;
        if (dropDownContent.classList.contains('is-active')) {
          dropDownContent.classList.remove('is-active');
          body.classList.remove('no-scrolling');
          body.style.paddingRight = '';
          if (header) header.style.paddingRight = '';

          return;
        }

        closeButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            dropDownContent.classList.remove('is-active');
            body.classList.remove('no-scrolling');
            body.style.paddingRight = '';
            if (header) header.style.paddingRight = '';
          });
        });

        dropDownContent.classList.add('is-active');
        body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        if (header) header.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        body.classList.add('no-scrolling');
      });

      popups.forEach((popup) => {
        popup.querySelector('.js-popup-wrapper').addEventListener('click', (event) => {
          // eslint-disable-next-line no-underscore-dangle
          event._isClickWithinDropDown = true;
        });

        popup.addEventListener('click', (event) => {
          // eslint-disable-next-line no-underscore-dangle
          if (event._isClickWithinDropDown) return;
          popup.classList.remove('is-active');
          body.classList.remove('no-scrolling');
          body.style.paddingRight = '';
          if (header) header.style.paddingRight = '';
        });
      });

      body.addEventListener('keyup', (event) => {
        if (event.code !== 'Escape') return;
        dropDownContent.classList.remove('is-active');
        body.classList.remove('no-scrolling');
        body.style.paddingRight = '';
        if (header) header.style.paddingRight = '';
      });
    }
  });
};

export default togglePopup;
