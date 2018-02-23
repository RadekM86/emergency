// shortest path algorithm in weighted undirected graph

function City(name, firestation, nodes){
    this.name=name;
    this.firestation = firestation;
}

var cities = [{name: "A", firestation: true}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}];
var roads = [{cities: ["A", "B"], time: 4}, {cities: ["B", "C"], time: 10}, {cities: ["A", "C"], time: 8}, {cities: ["D", "E"], time: 3}];


function cityBuilder(){
    var cityMap = cities.map(el=>new City(el.name, el.firestation))
    return cityMap
}

function nodefinder(name){
   var connections = roads.filter(elem => elem.cities.indexOf(name)!==-1)
   return connections
}

var cityMap = cityBuilder();


// .map(el=>new City(name, el.firestation,el.time))

var cityA = new City("A", true, ["B", "C"])

var firestationsMap = cities.filter(elem=>{
        return elem.firestation===true
    })




console.log(firestationsMap);
console.log(cityA)

// function dijkstra(Object, maximum){

// }
