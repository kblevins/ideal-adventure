var regionKeys = Object.keys(region_center);

// Populating dropdown with state names
function dropDown(){
  
  var regionDrop = document.getElementById("regionDrop");
  for (i = 0; i < regionKeys.length; i++) {
          var regionOp = document.createElement("option");
          regionOp.text = regionKeys[i];
          regionOp.value= regionKeys[i];
          regionDrop.appendChild(regionOp);
      }
    }

function RegionName(Region){
  var rg_head = document.getElementById("regionName");
  rg_head.innerHTML = region_center[Region].region;
}
// on first load
RegionName("PacificNorthwest");

// create dropdown
dropDown();

// insert state name into header
RegionName("PacificNorthwest");

// initializing map
RegionMap("PacificNorthwest");

// initializing chart
siteChart("PacificNorthwest");

// initialize bird list

// initialize bird photos

// what to do when the state is changed
function optionChanged(Region){
  console.log(Region);
  RegionName(Region);
  RegionMap(Region);
  siteChart(Region);
  }



function siteChart(Region){
  url = 'siteData/'+Region;
  Plotly.d3.json(url, function(error, siteData){
    if (error) return console.warn(error);
  var values = siteData.map(record => record.species_number);
  var sites = siteData.map(record => record.locName);

  var data = [
    {
      x: [1,2,3,4,5,6,7,8,9,10],
      y: values,
      type: 'bar',
      text: sites,
      marker: {
        color: '#9e9ac8'
      }
    }
  ];

  var layout = {
    title: "Top 10 Birding Sites",
    xaxis: {
      dtick: 1
    }
  };

  Plotly.newPlot('sitesChart', data, layout);
}
)}
