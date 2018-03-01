var stateKeys = Object.keys(state_center);

// Populating dropdown with region names
function dropDown(){
  
  var stateDrop = document.getElementById("stateDrop");
  for (i = 0; i < stateKeys.length; i++) {
          var stateOp = document.createElement("option");
          stateOp.text = stateKeys[i];
          stateOp.value= stateKeys[i];
          stateDrop.appendChild(stateOp);
      }
    }

function stateName(ST){
  var st_head = document.getElementById("stateName");
  st_head.innerHTML = state_center[ST].state;
}
// on first load
stateName("AL");

// create dropdown
dropDown();

// insert state name into header
stateName("AL");

// initializing map
stateMap("AL");

// initializing chart
siteChart("AL");

// initialize bird photos
birdPhotos("AL");

// what to do when the state is changed
function optionChanged(ST){
  console.log(ST);
  stateName(ST);
  stateMap(ST);
  siteChart(ST);
  birdPhotos(ST);
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

function birdPhotos(ST){
  url = 'birdData/'+ST;
  Plotly.d3.json(url, function(error, birdData){
    if (error) return console.warn(error);
  var names = birdData.map(record => record.comName);
  var images = birdData.map(record => record.img);
  var links = birdData.map(record => record.link);
  
  console.log(names);
  console.log(images);
  console.log(links);

  for(i=0; i<5; i++){
  document.getElementById('bird'+(i+1)).innerHTML = "<div id=bird"+(i+1)+"style='width: 100px; height: 100px;'></div>";
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


