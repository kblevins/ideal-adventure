var stateKeys = Object.keys(state_center);

// Populating dropdown with state names
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

// initialize bird list

// initialize bird photos

// what to do when the state is changed
function optionChanged(ST){
  console.log(ST);
  stateName(ST);
  stateMap(ST);
  siteChart(ST);
  }



function siteChart(ST){
  url = 'siteData/'+ST;
  Plotly.d3.json(url, function(error, siteData){
    if (error) return console.warn(error);
  var values = siteData.map(record => record.species_number);
  var sites = siteData.map(record => record.locName);

    //color list:solid bird, lavender,  pink,     peach,      eggshell,  pumpkin,   tangerine, orange,    burnt,     sienna
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
    title: "Top 10 Birding Sites",
    xaxis: {
      dtick: 1
    }
  };

  Plotly.newPlot('sitesChart', data, layout);
}
)}
