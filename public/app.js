$(function() {
    
// variables for DOM
        var ul = $(".list");
        var url = "http://localhost:3000";
    
//Algorithm functions

// shortest path algorithm in weighted undirected graph

/**
 * City Object constructor
 * 
 * @param {any} name 
 * @param {any} firestation 
 * @param {any} nodes 
 */
function City(name, firestation, nodes){
  this.name=name;
  this.firestation = firestation;
  this.nodes = nodes;
}
/**
 * Nodes Object constructor
 * 
 * @param {any} cities 
 * @param {any} time 
 */
function Nodes(cities, time){
  this.name = cities.join("");
  this.time = time
}

//variables and functions for the algorithm

var max = 10;
var cities = [];
var roads = [];


/** 
 * Nodes constructor 
 * 
 * @param {any} name 
 * @returns Nodes object from the given object name
 */
function nodefinder(name){
  let newArr =[];
  arr = roads.filter(elem => elem.name.indexOf(name)!==-1);
  arr.map(el=>newArr.push(new Nodes(el.name.filter(elem=>elem!==name), el.time)))
  return newArr
}

/**
 * Function for building array of Cites objects
 * 
 * @param {any} array 
 * @returns array of objects
 */
function cityBuilder(array){
  var cityMap = array.map(el=>new City(el.name, el.firestation, nodefinder(el.name)))
  return cityMap
}


//  API functions     

/**
 * API function for getting cites info
 * 
 * @param {any} cities 
 */
function insertCity(cities){
      getMax();
      getRoads();
      var cityMap = cityBuilder(cities);
      var firestations = cityMap.filter(el=>el.firestation=="true");
      function getCityByName(name){
        var result = cityMap.filter(el=>el.name===name)
        return result[0]
      }

/**
 * Algorithm for finding shortest route in undirectional wieghted graph with finite nodes within the given range
 * 
 * @param {any} current 
 * @param {any} firestations 
 * @param {any} time 
 * @param {any} unvisited 
 * @returns true if given node is in range
 */
let dijkstra = (current, firestations, time, unvisited) =>{
        let currentObject = getCityByName(current);
        unvisited = unvisited.filter(el=>el.name!==current)
        console.log(unvisited);
        console.log(currentObject)
        if(currentObject.firestation=="true"){
            console.log("found");
            return true
        }else{
            if(time>max){
              return false
            } else{
            let nodes = currentObject.nodes.map(el=>getCityByName(el.name))
            let times = currentObject.nodes.map(el=> el.time)
            for(let i = 0; i<nodes.length;i++){
                if(times[i]>max){
                  nodes.splice(i,1);
                  times.splice(i,1)
                }
            }
            let foundRoutesArray = []
            let firestationsInRange = nodes.filter(el=>el.firestation=="true");
            if(firestationsInRange.length>0){
                console.log('found it in range')
                return true
            }else{
                console.log("unvisited")
                console.log(unvisited);
                nodes.forEach(el=>{
                    foundRoutesArray = [];
                    if(dijkstra(el.name, firestations, el.time+time, unvisited)===true){
                        foundRoutesArray.push(true)
                    }else{
                        return false
                    }
                })
                if(foundRoutesArray.length>0){
                    console.log("found it anyway")
                    return true
                }
                return false
            }
        }
        }
      }


var firestations = cityMap.filter(el=>el.firestation==="true");
cities.forEach(function(cities){
              console.log(`cityMap ${cityMap}`)
              var li = $('<li>')
              if(dijkstra(cities.name, firestations, 0, cityMap)===true){
                li.addClass('inRange')
              }else{
                li.addClass('outOfRange')
              }
              let newObject = getCityByName(cities.name);
              var title = $('<h3>').text(cities.name);
              var icon = $('<i class="fa fa-building"></i>');
              var info = $('<p class="info">')
              var addBtn = $('<button>').html('Dodaj <i class="fa fa-plus"></i>').addClass('add')
              var infoplaceholder= (dijkstra(cities.name, firestations, 0, cityMap)===true)?"miasto w zasięgu straży pożarnej":"miasto poza zasięgiem straży pożarnej"
              info.text(cities.firestation==="true"?"posiada jednostkę straży pożarnej":infoplaceholder);
              var deleteBtn = $("<button class='deleteBtn'>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
              var roadsList = $('<ul class="roadList"><span>Drogi:  &nbsp</span><i class="fa fa-road"></i>')
              var newLi=[];              
              for(let i=0; i<newObject.nodes.length;i++){
                newLi.push(
                  $(`<li class="roads">${newObject.nodes[i].name}  &nbsp <i class="fa fa-arrow-circle-right"</i> &nbsp ${newObject.nodes[i].time} min </li><hr>`)
                )
              }
              roadsList.append(newLi);
              deleteBtn.data('id', cities.id);
              cities.firestation==="true" && li.addClass('firestation');
              li.append(icon)
              li.append(title);
              li.append(roadsList);
              li.append(info)
              li.append(deleteBtn)
              ul.append(li);

            });
    };
    
/**
 * Adds information to api of given input city name, roads and time
 * 
 * @param {any} cities 
 */
function addCity(cities){
      var url = "http://localhost:3000";
      var form = $('.add_City').submit(function(e){
        if(($('.get_name').val().length>0)&&($('.road').val().length>0)&&($('.time').val().length>0)){
          e.preventDefault();
          $('.placeholder').html('')
          var inputName = $('.get_name').val();
          var inputCheck = $('.check').is(':checked');
          var inputRoad = $('.road').val();
          var inputTime = $('.time').val();
          var inputArray=[inputName, inputRoad];
          var newCity = {
            id: this.id,
            name: inputName,
            firestation: inputCheck
          };
          fetch(url+"/roads", {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "time": parseInt(inputTime,10),
                "name": [
                  inputName,
                  inputRoad
                ]
              }
            )
          }).then(res=>res.json())
            .then(res => console.log(res));
            
          $.ajax({
              method: "POST",
              url: url + "/cities",
              dataType: "json",
              data: newCity
            })
            .done(function(response){
              console.log(response);
              $.ajax({
                method: "GET",
                url: url + "/cities",
                dataType: "json"
                })
                  .done(function(response){
                  ul.html("");
                  insertCity(response);
                    
                
                  })
                  .fail(function(error){
                  console.log('Error');
                  console.log(error);
                })
            })
            .fail(function(error){
            console.log('Error');
            console.log(error);
          })
        
      }else if($('.get_name').val().length===0){
            e.preventDefault();
            var placeholder = $(".placeholder").html("<h3>Nazwa miasta powinna zawierać conajmniej jeden znak</h3>").addClass('placeholder')
      }else {
        e.preventDefault();
        var placeholder = $(".placeholder").html("<h3>Miasto musi być połączone conajmniej jedną drogą z wyznaczonym czasem przejazdu</h3>").addClass('placeholder')
      }
    
    });
    
    }
    
/**
 * removes city from DOM and from API database
 * 
 */
function removeCity(){
      var deleteBtn = ul.on('click','.delete',function(){
        var thisbtn = $(this);
        var id = thisbtn.data('id');
          $.ajax({
            method: "DELETE",
            url: url + "/cities/"+ id,
            dataType: "json",
          })
          .done(function(response){

          })
          .fail(function(error){
            console.log('Error');
            console.log(error);
        })
        thisbtn.parent().remove();
      });
    
    }


  
/**
 * gets max value from database and stores it in the global variable
 * 
 */
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
/**
 * gets cities info form API database
 * 
 */
function getCities(){
    $.ajax({
    method: "GET",
    url: url + "/cities",
    dataType: "json"
    })
      .done(function(response){
      insertCity(response);
        
    
      })
      .fail(function(error){
      console.log('Error');
      console.log(error);
    })
    };
/**
 * Gets roads info from API database
 * 
 */
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

// end of ajax functions

getMax();
getRoads();
getCities();
removeCity();
addCity();

  // end of code
});
    