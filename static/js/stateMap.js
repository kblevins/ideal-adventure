function stateMap(ST){
  url = 'siteData/'+ ST;
  stateData = state_center[ST]
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);

    document.getElementById('stateMap').innerHTML = "<div id='map'></div>";
    var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
    {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var map = new L.Map('map');
    map.setView(new L.LatLng(stateData.center_lat, stateData.center_lng), stateData.zoom );
    map.addLayer(OpenStreetMap);

    var colors = ['solid bird', 'lavender', 'pink', 'peach', 'eggshell', 'pumpkin', 'tangerine', 'orange', 'burnt', 'sienna']
    
    for (var i = 0; i < data.length; i++) {
      var birdIcon = L.icon({
        iconUrl: '../static/images/'+colors[i]+'.png',
        shadowUrl: '../static/images/bird shadow.png',
      
        iconSize:     [32, 22], // size of the icon
        shadowSize:   [44, 10], // size of the shadow
        iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
        shadowAnchor: [20, 7],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
      var feature = data[i];
      
      L.marker([feature.lat, feature.lng], {icon: birdIcon})
        .bindPopup("<table><tbody><tr><th align='right'>Location: </th> <td align='right'>" + feature.locName + 
        "</td></tr><tr><th align='right'>Species reported: </th><td align='right'>" + feature.species_number + "</td></tbody></table>")
        .addTo(map);
        
    }
  }
)}
