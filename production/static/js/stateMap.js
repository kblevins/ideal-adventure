function stateMap(ST){
  url = 'siteData/'+ ST;
  stateData = state_center[ST]
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);

    document.getElementById('stateMap').innerHTML = "<div id='map' style='width: 500px; height: 450px;'></div>";
    var osmUrl = "https://api.mapbox.com/styles/v1/kkblevins/cje0f0el638792rmw5y3yw648/tiles/256/{z}/{x}/{y}?"+
    "access_token=pk.eyJ1Ijoia2tibGV2aW5zIiwiYSI6ImNqZGhqeWlxaDBiZ2kydnNhYTlseDE3eTYifQ.EWlCoyNVcod37iJ0nUdG3w"
    osmLayer = new L.TileLayer(osmUrl);
    var map = new L.Map('map');
    map.setView(new L.LatLng(stateData.center_lat, stateData.center_lng), stateData.zoom );
    map.addLayer(osmLayer);

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
        .bindPopup("<h3>" + feature.locName + "</h3><ul><p>" + feature.species_number + " birds</p>")
        .addTo(map);
        
    }
  }
)}