var default_coordinates = [48.418, 35.515];
var min_zoom = 8.5;

var map = L.map('map').setView(default_coordinates, min_zoom);


var test = new L.LayerGroup();

/* var noLayer = L.tileLayer('', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap<\/a> contributors',
    minZoom: 8.5,
    maxZoom: 16
}).addTo(map);  */


var sateliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design<\/a>, ' +
        '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0<\/a> &mdash; ' +
        'Map data {attribution.OpenStreetMap}',
    minZoom: 8.5,
    maxZoom: 16
}).addTo(map)


/* var mbUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
var base_layer = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: "mbAttr"})      



var map = L.map('map', {
    layers: []
}).setView(default_coordinates, min_zoom); */

var forSaleStyle = {
    opacity: 1,
    fillOpacity: 1,
    fillColor: 'blue',
    color: 'transparent'
}; 

var illegalStyle = {
    opacity: 1,
    fillOpacity: 1,
    fillColor: 'red',
    color: 'transparent'
}

var pzfStyle = {
    opacity: 1,
    fillOpacity: 1,
    fillColor: 'lightgrey',
    weight:1,
    color: 'grey'
}



/*  L.tileLayer(
    '', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 16,
        minZoom: min_zoom,
        ext: 'png'
    }).addTo(map);

    map.on('zoomend', function () {
        if (map.getZoom() >= 13) {
            map.addLayer(base_layer);
                
        }
        if (map.getZoom() < 13){
            map.removeLayer(base_layer);
        }   
    });

    var saleLayer = new L.LayerGroup();
    saleLayer.addTo(map); */

    fetch("data/pzf.geojson")
    .then(function (response) { return response.json() })
    .then(function (data) {
        L.geoJSON(data, {
             style: function(){ return pzfStyle },    
             onEachFeature: function(feature, layer) {
                layer.bindTooltip(feature.properties.name, { 'permanent': false })
            }              
        }).addTo(test);  
    })


    fetch("data/kadastr.geojson")
    .then(function (response) { return response.json() })
    .then(function (data) {
        L.geoJSON(data, {
             style: function(){ return forSaleStyle }                                          
        }).addTo(test);

    })

fetch("data/illegal.geojson")
    .then(function (response) { return response.json() })
    .then(function (data) {
        L.geoJSON(data, {
             style: function(){ return illegalStyle }                  
        }).addTo(test);

    }) 


    var divider = L.control.sideBySide({test}, sateliteLayer).addTo(map);            
    divider.setLeftLayers([noLayer, test]);


     //L.control.sideBySide(test, sateliteLayer).addTo(map); 
    //divider.setLeftLayers([noLayer, test]);
    //sideBySide.setLeftLayers([test]);      
    //var test = new L.LayerGroup().addTo(map);


