// shortest path algorithm in weighted undirected graph
$(function() {

// variables for DOM
    var ul = $(".list");
    var url = "http://localhost:3000";

// variables for algorithm

// var cities = [{name: "A", firestation: false}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}, {name: "F", firestation: false}, {name: "G", firestation: true}, {name: "W", firestation: false}];
// var roads = [{name: ["A", "B"], time: 4}, {name: ["B", "C"], time: 10}, {name: ["A", "C"], time: 8}, {name: ["D", "E"], time: 3}, {name: ["F", "A"], time: 5},{name:["F", "C"], time:5},{name: ["C", "G"], time: 1},{name: ["D", "B"], time: 7}, {name: ["A", "W"], time: 12}];

//ajax request

function Database(max, cities, roads){
    this.max = max;
    this.cities = cities;
    this.roads = roads
};



function City(name, firestation, nodes){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodes;
}

function Nodes(cities, time){
    this.name = cities.join("");
    this.time = time
}


function getData(){
var cityMap = cityBuilder(cities);
var firestations = cityMap.filter(el=>el.firestation===true);

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
        $.ajax({
        method: "GET",
        url: url + "/max",
        dataType: "json"
        })
        .done(function(response){
        max = response.time;
        })
        .fail(function(error){
        console.log('Error');
        console.log(error);
        })


        $.ajax({
        method: "GET",
        url: url + "/cities",
        dataType: "json"
        })
        .done(function(response){
        ities = response.map(el=>el)
        })
        .fail(function(error){
        console.log('Error');
        console.log(error);
        })

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

}

getData()

console.log(newData);



console.log("result")
console.log(shortestWay("Barcelona"));

}); 
// end of code