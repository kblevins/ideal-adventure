// needs to take an argument for the state to center on that state
// and set the zoom

// Create a map object
var myMap = L.map("map", {
  center: [31.4, -99.2],
  zoom: 6
});

// Add a tile layer

L.tileLayer("https://api.mapbox.com/styles/v1/kkblevins/cje0f0el638792rmw5y3yw648/tiles/256/{z}/{x}/{y}?"+
"access_token=pk.eyJ1Ijoia2tibGV2aW5zIiwiYSI6ImNqZGhqeWlxaDBiZ2kydnNhYTlseDE3eTYifQ.EWlCoyNVcod37iJ0nUdG3w"

).addTo(myMap);

// Loop through the cities array and create one marker for each city, 
// bind a popup containing its name and population add it to the map
for (var i = 0; i < top10.length; i++) {
  var feature = top10[i];
  
  L.marker([feature.lat, feature.lng])
    .bindPopup("<h3>" + feature.locName + "</h3><ul><p>" + feature.species_number + " birds</p>")
    .addTo(myMap);
}




