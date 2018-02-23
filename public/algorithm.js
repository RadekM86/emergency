// shortest path algorithm in weighted undirected graph

function City(name, firestation, nodes){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodes;
}

var cities = [{name: "A", firestation: true}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}];
var roads = [{cities: [cities[0].name,cities[1].name], time: 4}, {cities: [cities[1].name,cities[2].name], time: 10}, {cities: [cities[2].name,cities[3].name], time: 4}, {cities: [cities[3].name,cities[4].name], time: 3}];


function buildGraph(nodes, edges){
    var nodes = [];
    nodes = cities.map(elem=>{
        elem.connections = nodes.filter
    })
}

var firestationsMap = cities.filter(elem=>{
        return elem.firestation===true
    })




console.log(firestationsMap)

// function dijkstra(Object, maximum){

// }
