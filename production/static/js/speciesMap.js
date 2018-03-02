function speciesMap(species, days){
  url = 'speciesData/'+ species + "/" + days;
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);

    document.getElementById('speciesMap').innerHTML = 
    "<div id='map' ></div>";
    var osmUrl = "https://api.mapbox.com/styles/v1/kkblevins/cje0f0el638792rmw5y3yw648/tiles/256/{z}/{x}/{y}?"+
    "access_token=pk.eyJ1Ijoia2tibGV2aW5zIiwiYSI6ImNqZGhqeWlxaDBiZ2kydnNhYTlseDE3eTYifQ.EWlCoyNVcod37iJ0nUdG3w"
    osmLayer = new L.TileLayer(osmUrl);
    var map = new L.Map('map');
    map.setView(new L.LatLng(39.828175, -98.579500), 4);
    map.addLayer(osmLayer);

    var birdCounts = data.map(record => record.howMany);
    var maxCount = Math.max(...birdCounts);
    var bins = Math.round(maxCount/3);
    
    var color_list = ['#bcbddc','#9e9ac8','#756bb1']
    for (var i = 0; i < data.length; i++) {
      var feature = data[i];
      var birdCount = feature.howMany;
      
      if (birdCount < bins){
        col = color_list[0]
      } else if (birdCount > bins && birdCount <= bins*2){
        col = color_list[1]
      } else if (birdCount > bins*2){
        col = color_list[2]
      } 

      L.circleMarker([feature.lat, feature.lng], {
        fillOpacity: .5,
        color: col,
        fillColor: col,
        radius: feature.howMany
      })
        .bindPopup("<table><tbody><tr><th align='right'>Location: </th> <td align='right'>" + feature.locName + 
        "</td></tr><tr><th align='right'>Individuals reported: </th><td align='right'>" + feature.howMany + "</td></tbody></table>")
        .addTo(map);
        
    }
    var legend = L.control({position: 'bottomleft'});
    
    legend.onAdd = function (myMap) {
    
        var div = L.DomUtil.create('div', 'info legend'),
          
            grades = [0,bins,(bins*2)];
            div.innerHTML = '<p>Num of Birds</p>'
        // loop through our intervals and generate a label with a colored square for each interval
        for (var i = 0; i < 3; i++) {
          div.innerHTML +=
              '<i style="background:' + color_list[i] + '; color:' + color_list[i] + ';">....</i> ' +
              grades[i] + (grades[i+1] ? '&ndash;' + grades[i+1] + '<br>' : '&ndash;' + maxCount);
      }
      return div;
    };
    
    legend.addTo(map);
  }
)}