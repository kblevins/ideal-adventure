function speciesName(spCode){
  url = 'birdDB/'+spCode;
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);
  var sp_head = document.getElementById("speciesName");
  sp_head.innerHTML = data[0].comName;
  }  
)}


// initializing map
speciesMap("paibun", 30);
// insert species name into header
speciesName("paibun");
// initialize bird photos
speciesMedia("paibun");

var $submitBtn = document.getElementById("submit");
$submitBtn.addEventListener("click", function(){searchChanged()});

// what to do when the state is changed
function searchChanged(){

  var $date = document.getElementById("calendar");
  var $birdSearch = document.getElementById("birdSearch");

  daysSearch = 30;
  var spSearch = $birdSearch.value;

  speciesName(spSearch);
  speciesMap(spSearch, daysSearch);
  speciesMedia(spSearch);
  }

function speciesMedia(spCode){
  url = 'birdDB/'+spCode;
  Plotly.d3.json(url, function(error, data){
    if (error) return console.warn(error);
  
  var name = data[0].comName;
  var image = data[0].img;
  var link = data[0].link;
  var audio = data[0].audio;

  console.log(url)
  console.log([name, image, link, audio])

  document.getElementById('bird-media').innerHTML = "<div id=bird-media></div>";
  var feature = document.getElementById('bird-media')
    if(link !== "no link"){
      feature.href = link;
    }
    
    var birdImg = document.createElement("img");
    birdImg.setAttribute("style", "height: 70%; width: 70%;");
    if(image === "no img"){
      birdImg.src = "../static/images/solid bird.png"
    } else {
      birdImg.src = image;
    }

    feature.appendChild(birdImg);
    
    if(audio !== "no audio"){
      var birdAudio = document.createElement("audio");
      birdAudio.setAttribute("controls", "controls");
      var audioSource = document.createElement("source");
      audioSource.setAttribute("src", audio);
      audioSource.setAttribute("type", "audio/wav");
      birdAudio.appendChild(audioSource);
      feature.appendChild(birdAudio);
    }
  }
  )}