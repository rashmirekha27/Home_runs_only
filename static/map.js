const rootUrl = "http://127.0.0.1:5000/";
//declare the variable to store the json response from server for different usage
let all_data; //store all player data


// function returns the json response from server for all players data
function getall_data() {
    console.log("all_data");
    d3.json(rootUrl+'/all_data', function(error, response) {
      if(error) {
        console.log('ERROR:: ' + error);
      } else {
        console.log("Response: " + response);
        all_data = response;
        //top10assistsDropdown(top10AssistsPlayer);
        // plotBarChart(all_dataPlayer.assists,top10AssistsPlayer.name);
        //populate payer1 and player2 dropdown
        drawCountryMap(all_data.lat, all_data.long, all_data.nationality);
      }
    });
  }

  
//code to draw map
function drawCountryMap(latitude, longitude, countryCode) {
    //prepare the data for the map -- starts
    //convert the values to array from json object
    let arraylat = []; //array for latitude
    let arraylong = []; //array for longtitude
    let arrayNationality = []; //array for nationality
  
    for(key in latitude) {
      arraylat.push(latitude[key]);
      arraylong.push(longitude[key]);
      arrayNationality.push(countryCode[key]);
    }
    //prepare the data for the map -- ends
    
    //code to draw map
    // Creating the map object
    var myMap = L.map("map", {
      center: [50, 76],
      // center: [arraylat[0], arraylong[0]],
      zoom: 2
    });
  
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  
    // Create a new marker cluster group.
    var markers = L.markerClusterGroup();
  
    // Loop through the data.
    for (var i = 0; i < arraylat.length; i++) {
        // Add a new marker to the cluster group, and bind a popup.
        markers.addLayer(L.marker([arraylat[i], arraylong[i]])
          .bindPopup(arrayNationality[i]));
    }
  
    // Add our marker cluster layer to the map.
    myMap.addLayer(markers);
  }

  getall_data();