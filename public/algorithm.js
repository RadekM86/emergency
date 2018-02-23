// shortest path algorithm in weighted undirected graph

function City(name, firestation){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodefinder(this.name)
}

function Connections(array, time){
    this.array = array;
    this.time = time
}

var cities = [{name: "A", firestation: true}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}];
var roads = [{cities: ["A", "B"], time: 4}, {cities: ["B", "C"], time: 10}, {cities: ["A", "C"], time: 8}, {cities: ["D", "E"], time: 3}];




function nodefinder(name){
   var connections = roads.filter(elem => elem.cities.indexOf(name)!==-1)
   return connections
}
function cityBuilder(array){
    var cityMap = array.map(el=>new City(el.name, el.firestation, nodefinder(el.name)))
    return cityMap
}

var cityMap = cityBuilder(cities);

// var cityNodes = cityMap.map(elem=> elem.nodes=nodefinder(elem.name))

// .map(el=>new City(name, el.firestation,el.time))

var firestationsMap = cityMap.filter(elem=>{
        return elem.firestation===true
})

console.log(firestationsMap, cityMap);

// function dijkstra(Object, maximum){

// }
