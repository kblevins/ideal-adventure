function stateKeys(){
  url = '/stateCentroid'
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);
    // var st_keys = data.map(record => record.keys);
    var stateKeys = Object.keys(data);
    console.log(stateKeys)
    // for (i=0; i< values; i++) {
      // console.log(values[i][0]) 
    })
  }
//var stateKeys = stKeys();

// Populating dropdown with state names
function stateDropDown(){
  
  var stateDrop = document.getElementById("stateDrop");
  for (i = 0; i < stateKeys.length; i++) {
          var stateOp = document.createElement("option");
          stateOp.text = stateKeys[i];
          stateOp.value= stateKeys[i];
          stateDrop.appendChild(stateOp);
      }
  console.log("click")
    }

function stateName(ST){
  url = '/stateCentroid'
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);

    var st_head = document.getElementById("stateName");
    st_head.innerHTML = data[ST][0];
  })
}
// on first load
// stateName("AL");

// create dropdown
stateKeys();
stateDropDown();

// insert state name into header
stateName("TX");

// initializing map
stateMap("TX");

// initializing chart
siteChart("TX");

// initialize bird photos
birdPhotos("TX");

// what to do when the state is changed
function optionChanged(ST){
  console.log(ST);
  stateName(ST);
  stateMap(ST);
  siteChart(ST);
  birdPhotos(ST);
  console.log("click")
  }

function siteChart(ST){
  url = 'siteData/'+ST;
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

function birdPhotos(data){
  url = 'birdData/'+data;
  Plotly.d3.json(url, function(error, birdData){
    if (error) return console.warn(error);
  var names = birdData.map(record => record.comName);
  var images = birdData.map(record => record.img);
  var links = birdData.map(record => record.link);
  
  console.log(names);
  console.log(images);
  console.log(links);

  for(i=0; i<5; i++){
  document.getElementById('bird'+(i+1)).innerHTML = "<div id=bird"+(i+1)+"style='width: 150px; height: 150px;'></div>";
  var feature = document.getElementById('bird'+(i+1))
    if(links[i] !== "no link"){
      feature.href = links[i];
    }
    
    var birdImg = document.createElement("img");
    if(images[i] === "no img"){
      birdImg.src = "../static/images/solid bird.png"
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

var regionKeys = Object.keys(region_center);

// Populating dropdown with state names
function regionDropDown(){
  
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

  Plotly.newPlot('regionChart', data, layout);
  }
)}


