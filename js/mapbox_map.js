
const min_zoom = 8;
mapboxgl.accessToken = 'pk.eyJ1IjoicnJldXNzZXIiLCJhIjoiY2tsNzNnN2xwMXJ3bTJxcWplaHptZmtmNiJ9.4jyhYK5B3nCMw2NTD761hg';

const beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'empty_tiles.json',
    center: [35.515, 48.418],    
    minZoom: min_zoom,
    maxZoom: 14,
    zoom: min_zoom,
});
     
 const afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [35.515, 48.418],
    minZoom: min_zoom,
    maxZoom: 14,
    zoom: min_zoom,
}); 
     
// A selector or reference to HTML element
const container = '#comparison-container';
    
 const map = new mapboxgl.Compare(beforeMap, afterMap, container, {
// Set this to enable comparing two maps by mouse movement:
// mousemove: true
});

map.setSlider(window.innerWidth * 0.8); 

beforeMap.on("wheel", event => {
    if (event.originalEvent.ctrlKey) {
        return;
    }

    if (event.originalEvent.metaKey) {
        return;
    }

    if (event.originalEvent.altKey) {
        return;
    }

    event.preventDefault();
});


beforeMap.on('load', function () {

    beforeMap.addSource("pzf", {"type": "geojson", 'data': "data/pzf.geojson" });
    beforeMap.addLayer({
        "id": "pzf-fill",
        'type': 'fill',
        "source": "pzf",
        'paint': {
            'fill-color': 'lightgrey',
            'fill-outline-color': 'grey' 
        }
    });   


    beforeMap.addSource("illegal", {"type": "geojson", 'data': "data/illegal.geojson" });
    beforeMap.addLayer({
        "id": "illegal-fill",
        'type': 'fill',
        "source": "illegal",
        'paint': {'fill-color': 'red' }
    });
    
    beforeMap.addSource("for-sale", {"type": "geojson", 'data': "data/kadastr.geojson" });
    beforeMap.addLayer({
        "id": "sale-fill",
        'type': 'fill',
        "source": "for-sale",
        'paint': {'fill-color': 'blue' }
    });   
    

    beforeMap.on('click', 'pzf-fill', (e) => { 
      

        /* через якийсь дивний глюк позиція за координатами кліка (e.lngLat) не працює, 
        а позиція за координатами точки (e.point) вірна, якщо відняти window.innerHeight */     
        new mapboxgl.Popup()
                .setLngLat(beforeMap.unproject([e.point.x+120, e.point.y-window.innerHeight-30]))
                .setHTML(e.features[0].properties.name)
                .addTo(beforeMap);       
        });
   
        
       
         
    
})