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

var LocateMeControl = L.Control.extend({
  options: {
    position: 'topleft'
  },
  onAdd: function(map) {
    var container = L.DomUtil.create('div', 'locate-me');
    L.DomEvent.addListener(container, 'click', function(){
      window.map.locate({setView: true});
    });
    return container;
  }
});

window.map.addControl(new LocateMeControl());

var showCurrentLocation = function(e) {
  if('currentLocationRadius' in window){
    window.currentLocationRadius.setLatLng(e.latlng);
  } else {
    window.currentLocationRadius = L.circle(e.latlng, e.accuracy / 2, {
      stroke: false,
      fillColor: '#1e74ed',
      fillOpacity: 0.2,
      clickable: false
    }).addTo(window.map);
  }
  if('currentLocationMarker' in window){
    window.currentLocationMarker.setLatLng(e.latlng);
  } else {
    window.currentLocationMarker = L.circleMarker(e.latlng, {
      radius: 10,
      color: '#fff',
      opacity: 1,
      weight: 6,
      fillColor: '#1e74ed',
      fillOpacity: 1,
      clickable: false
    }).addTo(window.map);
  }
}

window.map.on('locationfound', showCurrentLocation);
