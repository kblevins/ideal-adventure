function speciesMap(species, days){
  url = 'speciesData/'+ species + "/" + days;
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);

    document.getElementById('speciesMap').innerHTML = 
    "<div id='map' ></div>";
    var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', 
    {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var map = new L.Map('map');
    map.setView(new L.LatLng(39.828175, -98.579500), 4);
    map.addLayer(OpenStreetMap);

    var birdCounts = data.map(record => record.howMany);
    var maxCount = Math.max(...birdCounts);
    var bins = Math.round(maxCount/3);
    
    function markerSize(num, max){
      var numUp = num*3;
      if(max < 15){
        return(numUp)
      } else if(max < 150){
        return(numUp/10)
      } else if(max < 1500){
        return(numUp/100)
      } else if(max < 15000){
        return(numUp/1000)
      } else if(max < 150000){
        return(numUp/10000)
      }
    }
    

    var color_list = ['#f16913','#d94801','#8c2d04']
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
        radius: markerSize(feature.howMany, maxCount)
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