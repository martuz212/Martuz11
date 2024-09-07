//inicio el mapa en la coordenada 6.210732, -75.573817 
var map = L.map('map').setView([6.210732, -75.573817], 15);

//inicio mapa base de un proveedor (OMS)
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //  maxZoom: 19,
    //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'});

    var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
    
//informacion cartograficainserta un punto
var marker = L.marker([6.210732, -75.573817]).addTo(map);

//inserta una etiqueta cliqueable de informacion del punto

marker.bindPopup("<b>Habla Cachon</b><br>Aquí vive carlos").openPopup();

//añadir un circulo 
var circle = L.circle([6.210732, -75.573817], {
    color: 'blue',
    fillColor: '#3cd18d',
    fillOpacity: 0.1,
    radius: 500
}).addTo(map);

//añadir un poligono

var polygon = L.polygon([
    [6.212606, -75.575394],
    [6.211993, -75.574273],
    [6.210804, -75.574584],
    [6.211220, -75.575480]
]);

var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "sat": Esri_WorldImagery
};

var overlayMaps = {
    "marker": marker,
    "circle": circle
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);