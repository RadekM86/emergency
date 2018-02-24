// shortest path algorithm in weighted undirected graph

function City(name, firestation, nodes){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodes;
}

function Nodes(cities, time){
    this.cities = cities.join("");
    this.time = time
}

function Route(cities, time){
    this.cities = cities;
    this.time = time
}

var arr = [];

var cities = [{name: "A", firestation: false}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}, {name: "F", firestation: false}, {name: "G", firestation: true}];
var roads = [{cities: ["A", "B"], time: 4}, {cities: ["B", "C"], time: 10}, {cities: ["A", "C"], time: 8}, {cities: ["D", "E"], time: 3}, {cities: ["F", "A"], time: 5},{cities:["F", "C"], time:5},{cities: ["C", "G"], time: 1},{cities: ["B", "D"], time: 7}];

function nodefinder(name){
    let newArr =[];
    arr = roads.filter(elem => elem.cities.indexOf(name)!==-1);
    arr.map(el=>newArr.push(new Nodes(el.cities.filter(elem=>elem!==name), el.time)))
    return newArr
}
function cityBuilder(array){
    var cityMap = array.map(el=>new City(el.name, el.firestation, nodefinder(el.name)))
    return cityMap
}


var cityMap = cityBuilder(cities);


function getCityByName(name){
    var result = cityMap.filter(el=>el.name===name)
    return result[0]
}




var visited = [];
var unvisited=[];
var dontGo=[];
var time=[0];
cityMap.forEach(el=>{
        unvisited.push(el.name)
})


function recursive (name){
    var object = getCityByName(name);
    console.log("im in: " + object.name)
    var route = new Route(time);
    if(object.firestation===true && route.time.reduce((prev, curr)=>{return prev+curr})<=10){
        console.log("found it");
        console.log("time " + route.time )
        return true
    } else{
        route.time=[];
        console.log('looking further')
        var possibleRoutes = [];
        for(let i=0; i<object.nodes.length;i++){
            possibleRoutes.push(object.nodes[i])
            route.time.push(object.nodes[i].time)
        }
        console.log(possibleRoutes)
        console.log(route)
    }
}
// recursive("A");

function pathFinder(name){
    var object = getCityByName(name);
    console.log("I'm in: " + object.name);
    var route = new Route(object.name, [0]);
    if(object.firestation===true && route.time.reduce((prev,curr)=>{return prev+curr})<=10){
        console.log("found it!");
        return true;
    }else{
        
        return false
    }
}

pathFinder("A");