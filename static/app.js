const rootUrl = "http://127.0.0.1:5000/";
//declare the variable to store the json response from server for different usage
let top10AssistsPlayer; //store top 10 assists data
let top10PassesPlayer; //store top 10 passes data
let top10GoalsPlayer; //store top 10 goals data
let all_data; //store all player data
let clubgoals; //store club goals data

//filter to get array index position on id
function findPlayerId(playerDataIds, playerId) {
  for(let x in playerDataIds) {
    if(playerDataIds[x] == playerId) {
      return x;
    }
  }
}

// function returns the json response from server for to 10 assist
function getTop10Assists() {
  console.log("top 10 assists");
  Plotly.d3.json(rootUrl+'/Top10Assists', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      top10AssistsPlayer = response;
      //top10assistsDropdown(top10AssistsPlayer);
      //drar bar chart for top 10 assists
      plotBarChart(top10AssistsPlayer.assists,top10AssistsPlayer.name, 'Top 10 Assists');
    }
  });
}

// function returns the json response from server for to 10 passes
function getTop10Passes() {
  console.log("top 10 passes");
  Plotly.d3.json(rootUrl+'/passes', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      top10PassesPlayer = response;
      //top10passesDropdown(top10PassesPlayer);
      //drar bar chart for top 10 passes
      plotBarChart(top10PassesPlayer.passes_attempted,top10PassesPlayer.name,'Top 10 Passes');
    }
  });
}

// function returns the json response from server for to 10 goals
function getTop10Goals() {
  console.log("top 10 goals");
  Plotly.d3.json(rootUrl+'/goals', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      top10GoalsPlayer = response;
      //top10goalsDropdown(top10GoalsPlayer);
      //drar bar chart for top 10 goals
      plotBarChart(top10GoalsPlayer.goals,top10GoalsPlayer.name, 'Top 10 Goals');
    }
  });
}

// function returns the json response from server for all players data
function getall_data() {
  console.log("all_data");
  Plotly.d3.json(rootUrl+'/all_data', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      all_data = response;
      //top10assistsDropdown(top10AssistsPlayer);
      // plotBarChart(all_dataPlayer.assists,top10AssistsPlayer.name);
      //populate payer1 and player2 dropdown
      // drawCountryMap(all_data.lat, all_data.long, all_data.nationality);
      populatePlayerDropdown(all_data);
    }
  });
}

//code to draw map
// function drawCountryMap(latitude, longitude, countryCode) {
//   //prepare the data for the map -- starts
//   //convert the values to array from json object
//   let arraylat = []; //array for latitude
//   let arraylong = []; //array for longtitude
//   let arrayNationality = []; //array for nationality

//   for(key in latitude) {
//     arraylat.push(latitude[key]);
//     arraylong.push(longitude[key]);
//     arrayNationality.push(countryCode[key]);
//   }
//   //prepare the data for the map -- ends
  
//   //code to draw map
//   // Creating the map object
//   var myMap = L.map("map", {
//     center: [50, 76],
//     // center: [arraylat[0], arraylong[0]],
//     zoom: 11
//   });

//   // Adding the tile layer
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(myMap);

//   // Create a new marker cluster group.
//   var markers = new L.markerClusterGroup();

//   // Loop through the data.
//   for (var i = 0; i < arraylat.length; i++) {
//       // Add a new marker to the cluster group, and bind a popup.
//       markers.addLayer(L.marker([arraylat[i], arraylong[i]])
//         .bindPopup(arrayNationality[i]));
//   }

//   // Add our marker cluster layer to the map.
//   myMap.addLayer(markers);
// }


//load  player1 and player2 drop down with player name as text and id as value
function top10assistsDropdown(playerData) {
  //get the player1 dropdown id to populate with player name
  let playertable = document.getElementById("PlayerInfoTable");
  playertable.innerHTML = ''; //clear the drop down options
  playertable.innerHTML += '<tr> <th>Name</th> <th>Assists</th> </tr>';
  //loop through jsaon response data
  for(key in playerData.id) {
    playertable.innerHTML += '<tr> <td>'+playerData.name[key]+'</td> <td>'+playerData.assists[key]+'</td> </tr>';
    // console.log(key + '::' + playerData.name[key] + ' :: ' + playerData.assists[key]);
  }
}

function top10passesDropdown(playerData) {
  //get the player1 dropdown id to populate with player name
  let playertable = document.getElementById("PlayerInfoTable");
  playertable.innerHTML = ''; //clear the drop down options
  playertable.innerHTML += '<tr> <th>Name</th> <th>Passes</th> </tr>';
  //loop through jsaon response data
  for(key in playerData.id) {
    playertable.innerHTML += '<tr> <td>'+playerData.name[key]+'</td> <td>'+playerData.passes_attempted[key]+'</td> </tr>';
  }
}

function top10goalsDropdown(playerData) {
  //get the player1 dropdown id to populate with player name
  let playertable = document.getElementById("PlayerInfoTable");
  playertable.innerHTML = ''; //clear the drop down options
  playertable.innerHTML += '<tr> <th>Name</th> <th>Goals</th> </tr>';
  //loop through jsaon response data
  for(key in playerData.id) {
    playertable.innerHTML += '<tr> <td>'+playerData.name[key]+'</td> <td>'+playerData.goals[key]+'</td> </tr>';
  }
}

//load  player1 and player2 drop down with player name as text and id as value
function populatePlayerDropdown(playerData) {
  //get the player1 dropdown id to populate with player name
  let player1Dropdown = document.getElementById("player1");
  player1Dropdown.innerHTML = ''; //clear the drop dpwn options
  //get the player1 dropdown id to populate with player name
  let player2Dropdown = document.getElementById("player2");
  player2Dropdown.innerHTML = ''; //clear the drop dpwn options
  let dropOption1;
  let dropOption2;
  console.log('Playerdate ' + playerData.id);
  //loop through jsaon response data
  for(key in playerData.id) {
    console.log(key + '::' + playerData.id[key] + ' :: ' + playerData.name[key]);
    dropOption1 = document.createElement("option");
    dropOption1.text = playerData.name[key];
    dropOption1.value = playerData.id[key];
    player1Dropdown.add(dropOption1);
    dropOption2 = document.createElement("option");
    dropOption2.text = playerData.name[key];
    dropOption2.value = playerData.id[key];
    player2Dropdown.add(dropOption2);
  }
  plotComparison(dropOption1, dropOption2);
}

function optionChanged(optionSelected) {
  if(optionSelected == 'Assists') {
    getTop10Assists();
  } else if(optionSelected == 'Passes') {
    getTop10Passes();
  } else if(optionSelected == 'Goals') {
    getTop10Goals();
  }
}

//plot bar chart 
function plotBarChart(xvalues,yvalues,chartTitle) {
  //console.log(xvalues);
  //console.log(yvalues);
  //convert the values to array from json object
  let arrayXValues = [];
  let arrayYValues = [];
  for(key in xvalues) {
    arrayXValues.push(xvalues[key]);
    arrayYValues.push(yvalues[key]);
  }
  //console.log(arrayXValues);
  //console.log(arrayYValues);
  
  //draw chart
  var trace1 = {
    x: arrayYValues,
    y: arrayXValues,
    type: 'bar',
   // text: arrayXValues,
    orientation: 'v',
    marker: {
      color: 'rgba(50,171,96,0.6)',
    }
  };

  var data = [trace1];
  var layout = {
    title: chartTitle,
    height: 500,
    width: 500
  };
  Plotly.newPlot("bar", data, layout, {displayModeBar: false, responsive: true});
}

//function to draw comparison charts of 2 players using bar charts
function plotComparison() {
  //get player 1 information
  let player1Id = document.getElementById("player1").value; //the current selected option in Player 1 drop down
  let player1Index = findPlayerId(all_data.id,player1Id); //get the array index position of the player 1

  //get player 2 information
  let player2Id = document.getElementById("player2").value;
  let player2Index = findPlayerId(all_data.id,player2Id); //get the array index position of the player 2

  console.log('Player 1: ' + all_data.name[player1Index] + ' Assists: ' + all_data.assists[player1Index] + ' Passes: ' + all_data.passes_attempted[player1Index] + ' Goals: ' + all_data.goals[player1Index]);
  console.log('Player 2: ' + all_data.name[player2Index] + ' Assists: ' + all_data.assists[player2Index] + ' Passes: ' + all_data.passes_attempted[player2Index] + ' Goals: ' + all_data.goals[player2Index]);

  //prepare data for assists
  var traceAssists = {
    x: [all_data.name[player1Index], all_data.name[player2Index]],
    y: [all_data.assists[player1Index], all_data.assists[player2Index]],
    type: 'bar',
    name: 'Assists'
  };

  //prepare data for passes
  var tracePasses = {
    x: [all_data.name[player1Index], all_data.name[player2Index]],
    y: [all_data.passes_attempted[player1Index], all_data.passes_attempted[player2Index]],
    type: 'bar',
    name: 'Passes'
  };

  //prepare data for goals
  var traceGoals = {
    x: [all_data.name[player1Index], all_data.name[player2Index]],
    y: [all_data.goals[player1Index], all_data.goals[player2Index]],
    type: 'bar',
    name: 'Goals'
  };

  var data = [traceGoals, traceAssists]; //, tracePasses

  var layout = {
      title: all_data.name[player1Index] + ' vs ' + all_data.name[player2Index],
      showlegend: true,
      width: 500,
      height: 480

  };

  Plotly.newPlot('comparison', data, layout, {displayModeBar: false, responsive: true});

}

// function returns the json response from server for to 10 assist
function ClubGoals() {
  console.log("club goals for season");
  Plotly.d3.json(rootUrl+'clubgoals', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      clubgoals = response;
      //Create a bubble chart for the club goals
      plotBubbleChart(clubgoals);
    }
  });
}
function plotBubbleChart(cgoals){
  // Create trace information for the bubble chart.
  let arrayClubname = [];
  let arrayGoals = [];
  for(key in cgoals.club) {
    arrayClubname.push(cgoals.club[key]);
    arrayGoals.push(cgoals.totalgoals[key]);
  }
  var bubblechartTrace = {
    x: arrayClubname,
    y: arrayGoals,
    text: arrayClubname,
    mode: 'markers',
    marker: {
      size: arrayGoals,
      color: 'green'
    }
    };
  
    // Create the layout for the bubble chart.
    var bubbleLayout = {
    title: "Club Season Goals",
    xaxis: {title: "Clubs"},
    showlegend: false
    };
  
    // Use Plotly to plot the data with the layout.
    // the bubblechartTrace needs to be placed in an array
    Plotly.newPlot("bubble", [bubblechartTrace], bubbleLayout);

}


//initialization code
getTop10Assists();
getall_data();
ClubGoals();







