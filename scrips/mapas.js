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
}).addTo(map);

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

// Cargar el archivo GeoJSON
// fetch('/Geojson/json_barrios_medellin.geojson')
//     .then(response => response.json())
//     .then(data => {
//         // Añadir el GeoJSON al mapa con estilos y eventos
//         L.geoJSON(data, {
//             //añado estilo de una variable
//         style: estilo_barrio

    
//         }).addTo(map);
//     })
//     .catch(err => console.error('Error cargando el archivo GeoJSON: ', err));
// // añado la variable con el estilo
//     var estilo_barrio ={
//         "color": "#FFC0CB",
//         "weight": 5,
//         "opacity": 0.65}

// Cargar el archivo GeoJSON
fetch('/Geojson/json_barrios_medellin.geojson')
    .then(response => response.json())
    .then(data => {
        // Añadir el GeoJSON al mapa con estilos y eventos
        L.geoJSON(data, {
            style: estiloBarrio,  // Aplica la función de estilo
            onEachFeature: function (feature, layer) {
              // Añadir popups para los barrios
              if (feature.properties && feature.properties.nombre_bar) {
                layer.bindPopup("Barrio: " + feature.properties.nombre_bar);
              }
            }
        }).addTo(map);
    })
    .catch(err => console.error('Error cargando el archivo GeoJSON: ', err));

// Función de estilo para personalizar el color de los barrios
function estiloBarrio(feature) {
    var baseStyle = {
        weight: 1,
        opacity: 1,
        fillOpacity: 0.7
    };

    // Ajustar el color en función del nombre del barrio
    switch (feature.properties.nombre_bar) {
        case 'Laureles':   // Cambia 'Laureles' por el nombre real del barrio en el GeoJSON
            baseStyle.color = '#ff0000';  // Color rojo para el borde
            baseStyle.fillColor = '#ffb3b3';  // Color de relleno rojo claro
            break;
        case 'La Floresta':
            baseStyle.color = '#00ff00';  // Color verde para el borde
            baseStyle.fillColor = '#b3ffb3';  // Color de relleno verde claro
            break;
        case 'Las Palmas':
            baseStyle.color = '#0000ff';  // Color azul para el borde
            baseStyle.fillColor = '#b3b3ff';  // Color de relleno azul claro
            break;
        default:
            baseStyle.color = '#cccccc';  // Color gris para el borde
            baseStyle.fillColor = '#e6e6e6';  // Color de relleno gris claro
    }
    return baseStyle;
}