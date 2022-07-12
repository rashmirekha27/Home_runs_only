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