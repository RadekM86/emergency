var ajaxBuilder = (url)=>{
    // variables for DOM
    
    var url = "http://localhost:3000";
    

    let City = (cities, roads, max)=>{
        this.cities = cities;
        this.roads = roads;
        this.max = max
    }
    function getRoads(){
        $.ajax({
        method: "GET",
        url: url + "/roads",
        dataType: "json"
        })
          .done(function(response){
          roads = response.map(el=>el)
        
          })
          .fail(function(error){
          console.log('Error');
          console.log(error);
        })
    };
    
    function getCities(){
        $.ajax({
        method: "GET",
        url: url + "/cities",
        dataType: "json"
        })
          .done(function(response){
          getRoads();
          insertCity(response);
            
        
          })
          .fail(function(error){
          console.log('Error');
          console.log(error);
        })
        };
    function getMax(){
        $.ajax({
        method: "GET",
        url: url + "/max",
        dataType: "json"
        })
        .done(function(response){
        max = response.time
        })
        .fail(function(error){
        console.log('Error');
        console.log(error);
        })
        };

    return new City(getRoads,getCities, getMax)
}

export default ajaxBuilder;