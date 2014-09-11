L.Icon.Default.imagePath = '/img/';

window.map = L.map('map').setView([53.404973, -2.979250], 15);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(window.map);

// L.marker([53.405050, -2.990580]).addTo(window.map);
