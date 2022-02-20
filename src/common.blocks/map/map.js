function init() {
  const address = document.querySelector('.js-map-address').textContent;
  const myMap = new ymaps.Map('map', {
    center: [43.683758574578626, 40.256957499999906],
    zoom: 11,
  });
  const myPlacemark = new ymaps.Placemark([43.683758574578626, 40.256957499999906], {
    balloonContentBody: address,
  });

  myMap.geoObjects.add(myPlacemark);

  myMap.balloon.open([43.683758574578626, 40.256957499999906], address, {
    closeButton: false,
  });
}

if (document.getElementById('map')) {
  ymaps.ready(init);
}
