const rootUrl = "http://127.0.0.1:5000/";
let top10AssistsPlayer;
let top10PassesPlayer;
let top10GoalsPlayer;

//filter to get array index position on id
function findPlayerId(playerDataIds, playerId) {
  for(let x in playerDataIds) {
    if(playerDataIds[x] == playerId) {
      return x;
    }
  }
}
// function returns the json response from server
function getTop10Assists() {
  console.log("top 10 assists");
  Plotly.d3.json(rootUrl+'/Top10Assists', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      top10AssistsPlayer = response;
      top10assistsDropdown(top10AssistsPlayer);
    }
  });
}

function getTop10Passes() {
  console.log("top 10 passes");
  Plotly.d3.json(rootUrl+'/passes', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      top10PassesPlayer = response;
      top10passesDropdown(top10PassesPlayer);
    }
  });
}

function getTop10Goals() {
  console.log("top 10 passes");
  Plotly.d3.json(rootUrl+'/goals', function(error, response) {
    if(error) {
      console.log('ERROR:: ' + error);
    } else {
      console.log("Response: " + response);
      top10GoalsPlayer = response;
      top10goalsDropdown(top10GoalsPlayer);
    }
  });
}


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


function onChangePlayer1(playerId) {
  let x = findPlayerId(top10AssistsPlayer.id,playerId);
  console.log(top10AssistsPlayer.name[x]);
  // console.log(selectedRow.assists);
}
//initialization

getTop10Assists();










// Select the dropdown 



/*
var selectDrop = d3.select("#selDataset");


function init() {

    //Select the dropdown 
    var selectDrop = d3.select("#selDataset");

    // Build the list that should appear in the dropdown
    // d3.json used to access the samples.json file
    d3.json("/").then((data) => {

      // log the initial data retrieved from the samples.json file to the console
      console.log(data);

      // Create a variable that will house the data from the "name" array
      var playerNames = data.name;

      // the array.forEach() function acts like a for loop
      // we use this action to look at each object in the "names" array
      // and append the players 
      playerNames.forEach((player) => {
        selectDrop
          .append("option")
          .text(player)
          .property("value", player);
    
     
    });

    // Build the list of datapoints that should be reflected for the first
      // Test Subject ID No. 
      var playerOne = playerNames[0];
      demoData(playerOne);


    });

    d3.json("/team_stats").then((data) => {

        // log the initial data retrieved from the samples.json file to the console
        console.log(data);
      
       
    });


    d3.json("/goals").then((data) => {

    // log the initial data retrieved from the samples.json file to the console
    console.log(data);
    
    
    });


    d3.json("/passes").then((data) => {

        // log the initial data retrieved from the samples.json file to the console
        console.log(data);
        
        
    });

    d3.json("/all_data").then((data) => {

        // log the initial data retrieved from the samples.json file to the console
        console.log(data);
        
        
    });


  }
  // Calling the init function
  init();


// optionChanged function is called in the index.html so we will go ahead and use this
  // instead of using the on click method from javascript
  function optionChanged(player) {
    // Print the Test Subject ID No. that prompted the change to the console
    console.log(player);


}
*/