L.Icon.Default.imagePath = '/img/';

window.map = L.map('map').setView([53.404973, -2.979250], 15);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(window.map);

$.getJSON('https://gist.githubusercontent.com/paulfurley/723698b43127ddf9fe1c/raw/0778350edf1d2774476205d3a865b9ba560b15d2/citybike.json', function(apiResponse){
  $.each(apiResponse.locations, function(){
    var m = L.marker([this.latitude, this.longitude]);
    m.bindPopup(this.locationName, {closeButton: false});
    m.addTo(window.map);
  });
});

