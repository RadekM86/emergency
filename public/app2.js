$(function() {
    
// variables for DOM
        var ul = $(".list");
    
        var url = "http://localhost:3000";
    
//Algorithm functions

// shortest path algorithm in weighted undirected graph

function City(name, firestation, nodes){
  this.name=name;
  this.firestation = firestation;
  this.nodes = nodes;
}

function Nodes(cities, time){
  this.name = cities.join("");
  this.time = time
}

//variables and functions for the algorithm

var max = 10;
var cities = [];
var roads = [];

function nodefinder(name){
  let newArr =[];
  arr = roads.filter(elem => elem.name.indexOf(name)!==-1);
  arr.map(el=>newArr.push(new Nodes(el.name.filter(elem=>elem!==name), el.time)))
  return newArr
}

function cityBuilder(array){
  var cityMap = array.map(el=>new City(el.name, el.firestation, nodefinder(el.name)))
  return cityMap
}

//  Ajax functions     
    function insertCity(cities){
      getMax();
      getRoads();
      var cityMap = cityBuilder(cities);
      var firestations = cityMap.filter(el=>el.firestation===true);
      function getCityByName(name){
        var result = cityMap.filter(el=>el.name===name)
        return result[0]
      }
      var searchTimesArray = [];
      var fastestResponse = [];

      let reversedBFS = (name, goal, time) =>{
        let object = getCityByName(name);
        console.log("I'm in: " + object.name + " looking for " + goal);
        let nodesArray = object.nodes.map(el=>el.name);
        let timesArray = object.nodes.map(el=>el.time);
        let searchTime = timesArray[nodesArray.indexOf(goal)]+time;
        searchTimesArray.push(searchTime);
        fastestResponse = searchTimesArray.sort(function(a, b){return a-b})
        if(fastestResponse[0]<max){
            if (nodesArray.indexOf(goal)>-1){
                return true
            }else{
                object.nodes.forEach(el=> reversedBFS(el.name, goal, el.time))
            }
        }else{
            return false
        }
      }


      let search = (goal) => {
        searchTimesArray = [];
        let firestationsNames = firestations.map(el=>el.name);
        if (firestationsNames.indexOf(goal)!==-1){
            searchTimesArray.push(0)
            return true
        }else{
            for (let i = 0; i<firestationsNames.length; i++){
                if(reversedBFS(firestationsNames[i], goal, 0)===true){
                  
                    return true
                }
            }return false
        }
      }

      let shortestWay = (name, firestations)=>{
        do{
            search(name, firestations)
        }
        while(fastestResponse[0]>max);
        return search(name, firestations)
      }

      var firestations = cityMap.filter(el=>el.firestation==="true");
      cities.forEach(function(cities){
              console.log(firestations);
              // console.log(shortestWay(cities.name));
              console.log(search(cities.name, firestations))
              var li = $('<li>')
              if(shortestWay(cities.name)===true){
                li.addClass('inRange')
              }else{
                li.addClass('outOfRange')
              }
              var title = $('<h3>').text(cities.name);
              var info = $('<p>')
              var infoplaceholder= (shortestWay(cities.name)===true)?"miasto w zasięgu straży pożarnej":"miasto poza zasięgiem straży pożarnej"
              info.text(cities.firestation==="true"?"posiada jednostkę straży pożarnej":infoplaceholder);
              var deleteBtn = $("<button>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
              deleteBtn.data('id', cities.id);
              cities.firestation==="true" && li.addClass('firestation')
              li.append(title);
              li.append(info)
              li.append(deleteBtn);


              // li.append(editBtn);
              ul.append(li);

            });
    };
    
function addCity(cities){
    var url = "http://localhost:3000";
    
    var form = $('.add_City').submit(function(e){
        // ajax
        $.ajax({
            method: "GET",
            url: url + "/cities",
            dataType: "json"
            })
              .done(function(response){
                function populate(selector) {
                  response.forEach(el => {
                    $(selector)
                    .append(`<option value=${el.name} class="option">${el.name}</option>`)
                  })
                }
                populate('.add_City .roads');
              })
              .fail(function(error){
              console.log('Error');
              console.log(error);
            })
        if($('.get_name').val().length>0 && $('.option').attr('selected','selected')){
            e.preventDefault();
            $('.placeholder').html("")
            var inputName = $('.get_name').val();
            var inputCheck = $('.check').is(':checked');
            var roadName = $('.roads option').val();
            var time = parseInt($(".time").val(), 10)
            var newCity = {
                id: this.id,
                name: inputName,
                firestation: inputCheck
            };
            var newRoad = {
                id: this.id,
                name: [roadName, inputName],
                time: time
            }
            $.ajax({
                method: "POST",
                url: url + "/cities",
                dataType: "json",
                data: newCity
              })
              .done(function(response){
                console.log(response);
                var li = $('<li>')
                var newTitle = $('<h3>').text(response.name);
                var newFireStation = $('<p>').text(response.firestation==="true"?"posiada jednostkę straży pożarnej":"")
                var deleteBtn = $("<button>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
                deleteBtn.data('id', response.id);
                li.append(newTitle);
                li.append(newFireStation)
                li.append(deleteBtn);
                response.firestation==="true" && li.addClass('firestation');
                $('.get_name').val('')
                // li.append(editBtn);
                ul.append(li);
              })
              .fail(function(error){
              console.log('Error');
              console.log(error);
            })
        }else{
            e.preventDefault();
            var placeholder = $(".placeholder").html("<h3>Nazwa miasta powinna zawierać conajmniej jeden znak</h3>").addClass('placeholder')
      }

    })
} 
// end
    
    function addCity2(cities){
      var url = "http://localhost:3000";
      var form = $('.add_City').submit(function(e){
        if($('.get_name').val().length>0){
          e.preventDefault();
          $('.placeholder').html('')
          var inputName = $('.get_name').val();
          var inputCheck = $('.check').is(':checked')
          var newCity = {
            id: this.id,
            name: inputName,
            firestation: inputCheck
          };
          $.ajax({
              method: "POST",
              url: url + "/cities",
              dataType: "json",
              data: newCity
            })
            .done(function(response){
              console.log(response);
              var li = $('<li>')
              var newTitle = $('<h3>').text(response.name);
              var newFireStation = $('<p>').text(response.firestation==="true"?"posiada jednostkę straży pożarnej":"")
              var deleteBtn = $("<button>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
              deleteBtn.data('id', response.id);
              li.append(newTitle);
              li.append(newFireStation)
              li.append(deleteBtn);
              response.firestation==="true" && li.addClass('firestation');
              $('.get_name').val('')
              // li.append(editBtn);
              ul.append(li);
            })
            .fail(function(error){
            console.log('Error');
            console.log(error);
          })
      }else{
            e.preventDefault();
            var placeholder = $(".placeholder").html("<h3>Nazwa miasta powinna zawierać conajmniej jeden znak</h3>").addClass('placeholder')
      }
    
    });
    
    }
    
    
    function addRoads(roads){
      var url = "http://localhost:3000";
      var form = $(".add_City")
      $.ajax({
      method: "GET",
      url: url + "/cities",
      dataType: "json"
      })
        .done(function(response){
          function populate(selector) {
            response.forEach(el => {
              $(selector)
              .append(`<option value=${el.name}>${el.name}</option>`)
            })
          }
          
          populate('.add_City .roads');
        })
        .fail(function(error){
        console.log('Error');
        console.log(error);
      })
      var form = $('.add_City').submit(function(e){
        if($('option').val().length>0){
          e.preventDefault();
          $('.placeholder').html('')
          var inputName = $('.get_name').val();
          var inputCheck = $('.check').is(':checked')
          var newCity = {
            id: this.id,
            name: inputName,
            firestation: inputCheck
          };
          $.ajax({
              method: "POST",
              url: url + "/roads",
              dataType: "json",
              data: newRoad
            })
            .done(function(response){
              console.log(response);
              var li = $('<li>')
              var newTitle = $('<h3>').text(response.name);
              var newFireStation = $('<p>').text(response.firestation==="true"?"posiada jednostkę straży pożarnej":"")
              var deleteBtn = $("<button>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
              deleteBtn.data('id', response.id);
              li.append(newTitle);
              li.append(newFireStation)
              li.append(deleteBtn);
              response.firestation==="true" && li.addClass('firestation');
              $('.get_name').val('')
              // li.append(editBtn);
              ul.append(li);
            })
            .fail(function(error){
            console.log('Error');
            console.log(error);
          })
      }else{
            e.preventDefault();
            var placeholder = $(".placeholder").html("<h3>Nazwa miasta powinna zawierać conajmniej jeden znak</h3>").addClass('placeholder')
      }
    })}

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
            console.log(response);
          })
          .fail(function(error){
            console.log('Error');
            console.log(error);
        })
        thisbtn.parent().remove();
      });
    
    }


  
  
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

// end of ajax functions

getMax();
getRoads();
getCities();
removeCity();
addCity();
addRoads();

  // end of code

    

// shortest path algorithm in weighted undirected graph

function City(name, firestation, nodes){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodes;
}

function Nodes(cities, time){
    this.name = cities.join("");
    this.time = time
}

var max = 10;
var cities = [{name: "A", firestation: false}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}, {name: "F", firestation: false}, {name: "G", firestation: true}, {name: "W", firestation: false}];
var roads = [{name: ["A", "B"], time: 4}, {name: ["B", "C"], time: 10}, {name: ["A", "C"], time: 8}, {name: ["D", "E"], time: 3}, {name: ["F", "A"], time: 5},{name:["F", "C"], time:5},{name: ["C", "G"], time: 1},{name: ["D", "B"], time: 7}, {name: ["A", "W"], time: 12}];

function nodefinder(name){
    let newArr =[];
    arr = roads.filter(elem => elem.name.indexOf(name)!==-1);
    arr.map(el=>newArr.push(new Nodes(el.name.filter(elem=>elem!==name), el.time)))
    return newArr
}

function cityBuilder(array){
    var cityMap = array.map(el=>new City(el.name, el.firestation, nodefinder(el.name)))
    return cityMap
}


var cityMap = cityBuilder(cities);

var firestations = cityMap.filter(el=>el.firestation===true);

function getCityByName(name){
    var result = cityMap.filter(el=>el.name===name)
    return result[0]
}


var searchTimesArray = [];
var fastestResponse = [];

let reversedBFS = (name, goal, time) =>{
    let object = getCityByName(name);
    console.log("I'm in: " + object.name + " looking for " + goal);
    console.log(object.nodes)
    let nodesArray = object.nodes.map(el=>el.name);
    let timesArray = object.nodes.map(el=>el.time);
    let searchTime = timesArray[nodesArray.indexOf(goal)]+time;
    searchTimesArray.push(searchTime);
    fastestResponse = searchTimesArray.sort(function(a, b){return a-b})
    console.log(searchTime)
    console.log(nodesArray.indexOf(goal))
    if(fastestResponse[0]<max){
        if (nodesArray.indexOf(goal)>-1){
            return true
        }else{
            object.nodes.forEach(el=> reversedBFS(el.name, goal, el.time))
        }
    }else{
        return false
}
}


let search = (goal) => {
    searchTimesArray = [];
    let firestationsNames = firestations.map(el=>el.name);
    console.log(firestationsNames)
    if (firestationsNames.indexOf(goal)!==-1){
        searchTimesArray.push(0)
        return true
    }else{
        for (let i = 0; i<firestations.length; i++){
            if(reversedBFS(firestations[i].name, goal, 0)===true){
                return true
            }
        }return false
    }
}

let shortestWay = (name)=>{
    do{
        search(name)
    }
    while(fastestResponse[0]>max);
    return search(name)
}
// end of code
});