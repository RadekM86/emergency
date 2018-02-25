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

      let reversedBFS3 = (name, goal, time) =>{
        console.log(falseTest);
        if(falseTest.length ===0){
          let object = getCityByName(name);
          console.log("I'm in: " + object.name + " looking for " + goal);
          let nodesArray = object.nodes.map(el=>el.name);
          let timesArray = object.nodes.map(el=>el.time);
          let searchTime = timesArray[nodesArray.indexOf(goal)]+time;
          searchTimesArray.push(searchTime);
          fastestResponse = searchTimesArray.sort(function(a, b){return a-b})
          if(fastestResponse[0]>max){
             return false
          }else{
              if (nodesArray.indexOf(goal)>-1){
              return true
              }else{
              object.nodes.forEach(el=> reversedBFS2(el.name, goal, el.time, falseTest))
              }
          }
        } 
        return false
      }

      let reversedBFS2 = (goal, firestations, time) =>{
        if(time<10){
          let object = getCityByName(goal);
          for(let i = 0; i<firestations.length;i++){
            console.log(`I'm in ${firestations[i]} looking for ${goal}`);
            let nodesArray = object.nodes.map(el=>el.name);
            let timesArray = object.nodes.map(el=>el.time);
            let searchTime = timesArray[nodesArray.indexOf(goal)] + time;
            console.log(`search time: ${searchTime}`)
            searchTimesArray.push(searchTime);
            fastestResponse = searchTimesArray.sort(function(a,b){return a-b})
            if(fastestResponse[0]>max){
              return false
            }else if(nodesArray.indexOf(goal)!==-1){
              return true
            }else{
              object.nodes.forEach(el=> reversedBFS2(el.name, goal, el.time))
            }
          }
        }else{
          return false
        }
       }
      
      let reversedBFS = (goal, firestations, time)=>{
        if(time>max){
          return false
        }else{
          firestations.forEach(el=>{
            let object = getCityByName(el.name);
            console.log(`I'm in ${el.name} looking for ${goal}`)
            let goalSearch = object.nodes.filter(el=>{el.name===goal && (el.time + time <=10)});
            if (goalSearch.length!==0){
              return true
            }else{
              let deeperSearch = object.nodes.filter(el=>el.time<10);
              deeperSearch.forEach(el=>{
                let objectDeeper = getCityByName(el.name)
                reversedBFS(goal, objectDeeper.name, objectDeeper.time+time)
              })
            }
          })
        }
      }


      let shortestWay = (name, firestations)=>{
        if(reversedBFS(name, firestations,0)===false){
          return false
        }else{
          return true
        }
      }

      let search = (goal) => {
        searchTimesArray = [];
        var falseTest = [];
        let firestationsNames = firestations.map(el=>el.name);
        if (firestationsNames.indexOf(goal)!==-1){
            searchTimesArray.push(0)
            return true
        }else{
            for (let i = 0; i<firestationsNames.length; i++){
                if(reversedBFS2(firestationsNames[i], goal, 0, falseTest)===true){
                }else
                { 
                  falseTest.push(false) 
                  return false}
            }
        }
        return false
      }

      let shortestWay2 = (name, firestations)=>{
        do{

            search(name, firestations)
         }
        while(fastestResponse[0]>max && search(name, firestations)===true);
        return search(name, firestations)
      }

      var firestations = cityMap.filter(el=>el.firestation==="true");
      cities.forEach(function(cities){
 
              var li = $('<li>')
              if(shortestWay(cities.name, firestations)===true){
                li.addClass('inRange')
              }else{
                li.addClass('outOfRange')
              }
              var title = $('<h3>').text(cities.name);
              var icon = $('<i class="fa fa-building"></i>')
              var info = $('<p>')
              var infoplaceholder= (shortestWay(cities.name)===true)?"miasto w zasięgu straży pożarnej":"miasto poza zasięgiem straży pożarnej"
              info.text(cities.firestation==="true"?"posiada jednostkę straży pożarnej":infoplaceholder);
              var deleteBtn = $("<button>").html('Usuń <i class="fa fa-remove"></i>').addClass('delete');
              deleteBtn.data('id', cities.id);
              cities.firestation==="true" && li.addClass('firestation');
              li.append(icon)
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
        if($('.get_name').val().length>0){
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

  // end of code
});
    