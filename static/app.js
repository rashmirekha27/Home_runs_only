
function init() {

    // Select the dropdown 
    // var selectDrop = d3.select("#selDataset");

    // Build the list that should appear in the dropdown
    // d3.json used to access the samples.json file
    d3.json("/").then((data) => {

      // log the initial data retrieved from the samples.json file to the console
      console.log(data);
    
     
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