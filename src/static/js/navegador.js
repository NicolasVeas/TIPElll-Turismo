var counter = 1;
setInterval(function () {
    document.getElementById('i' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);

// Mapa
// -33.59829709005887, -71.60798902585982 Coordenadas San Antonio
var map = L.map('mapid').setView([-33.59829709005887, -71.60798902585982], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-33.59829709005887, -71.60798902585982]).addTo(map)
    .bindPopup('Centro de San Antonio')
    .openPopup();