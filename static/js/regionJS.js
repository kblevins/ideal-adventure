var regionKeys = Object.keys(region_center);

// Populating dropdown with state names
function RegionDropDown(){
  
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
RegionDropDown();

// insert state name into header
RegionName("PacificNorthwest");

// initializing map
RegionMap("PacificNorthwest");

// initializing chart
regionChart("PacificNorthwest");

// initialize bird list

// initialize bird photos
birdPhotos("PacificNorthwest");

// what to do when the region is changed
function optionChanged(Region){
  console.log(Region);
  RegionName(Region);
  RegionMap(Region);
  regionChart(Region);
  birdPhotos(Region);
  }

function regionChart(Region){
  url = 'regionData/'+Region;
  Plotly.d3.json(url, function(error, regionData){
    if (error) return console.warn(error);
  var values = regionData.map(record => record.species_number);
  var sites = regionData.map(record => record.locName);
  var colors = ["#9e9ac8", "#b5afed", "#f6b2ff", "#ffc1df", "#ffebbc", "#ffc849", "#ff975b", "#ff830f", "#db6600", "#843c09"]
  var data = [
    {
      x: [1,2,3,4,5,6,7,8,9,10],
      y: values,
      type: 'bar',
      text: sites,
      marker: {
        color: colors
      }
    }
  ];

  var layout = {
    xaxis: {
      dtick: 1,
      title: "Top 10 Birding Sites"
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

  Plotly.newPlot('regionChart', data, layout);
  }
)}


function birdPhotos(region){
  url = 'birdRegData/'+region;
  Plotly.d3.json(url, function(error, birdData){
    if (error) return console.warn(error);
  var names = birdData.map(record => record.comName);
  var images = birdData.map(record => record.img);
  var links = birdData.map(record => record.link);

  for(i=0; i<5; i++){
  document.getElementById('bird'+(i+1)).innerHTML = "<div id=bird"+(i+1)+"style='width: 150px; height: 150px;'></div>";
  var feature = document.getElementById('bird'+(i+1))
    if(links[i] !== "no link"){
      feature.href = links[i];
    }
    
    var birdImg = document.createElement("img");
    if(images[i] === "no img"){
      birdImg.src = "../static/images/no-bird.png"
    } else {
      birdImg.src = images[i];
    }

    var figCap = document.createElement("figcaption");
    figCap.innerHTML = names[i];

    feature.appendChild(birdImg);
    feature.appendChild(figCap);
  }
  }
)}