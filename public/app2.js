$(function() {
    
// variables for DOM
var ul = $(".list");
var url = "http://localhost:3000";

function CityMap(cities, roads, max){
    this.cities=cities;
    this.roads = roads;
    this.max = max
}

var wholeMap = new CityMap()
console.log(wholeMap)


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

wholeMap.cities = getCities()
//Algorithm functions

//end of code
});