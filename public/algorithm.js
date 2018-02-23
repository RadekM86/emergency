// shortest path algorithm in weighted undirected graph

function City(name, firestation){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodefinder(this.name);
}

function Road(name, time){
    this.name=name;
    this.time=time
}

var cities = [{name: "A", firestation: false}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}, {name: "F", firestation: false}];
var roads = [{cities: ["A", "B"], time: 4}, {cities: ["B", "C"], time: 10}, {cities: ["A", "C"], time: 8}, {cities: ["D", "E"], time: 3}, {cities: ["F", "A"], time: 53}];

function nodefinder(name){
    var connections = roads.filter(elem => elem.cities.indexOf(name)!==-1);
    return connections
}
function cityBuilder(array){
    var cityMap = array.map(el=>new City(el.name, el.firestation, nodefinder(el.name)))
    return cityMap
}

var cityMap = cityBuilder(cities);

var firestationsMap = cityMap.filter(elem=>{
        return elem.firestation===true
})

console.log(cityMap)

function pathToFirestation(object){
    if (object.firestation === true){
        console.log("found")
        return
    }else{
        var time = object.nodes.map(el=>el.time)
        var shortestTime = time.sort(function(a, b){return a-b})
        console.log(shortestTime)
        if(shortestTime[0]>10){ console.log("not found") }
        else{console.log("found")}
    }
}

function getCityByName(name){
    var result = cityMap.filter(el=>el.name===name)
    return result[0]
}

function breadthFirstSearch(object){
    var time = object.nodes.map(el=>el.time)
    var shortestTime = time.sort(function(a, b){return a-b})
    if (object.firestation === true){
        return "found"
}
    else if(shortestTime[0]<=10){
        return "found"
    }else{
       console.log("not found")
    }
}

function connectingNodes(name){
    return getCityByName(name)
}

function dijkstra(object){

    var visited=[];
    var times=[];
    var unvisited=cityMap;
    var index = unvisited.indexOf(object);
    if (index > -1) {
        unvisited.splice(index, 1);
    }
    var closest = object.nodes
    for(let i=0; i<closest.length; i++){
        visited.push(object.nodes[i])
        times.push(object.nodes[i].time)
    }
    console.log("visited")
    console.log(visited)
    console.log(times)
    console.log("dive deeper");
    closest.filter((el,index)=>{
        el.cities.splice(el.cities.indexOf(object.name), 1)
        el.cities.map(el=>getCityByName(el.cities))
        dijkstra(el.cities)
})
}

function hasFirestation(obj){
    if (obj.firestation === true){
        return true
    }
}
// console.log(dijkstra(cityMap[0]))
// console.log(nodefinder("A"))
// console.log(getCityByName("B"));
// breadthFirstSearch(cityMap[5]);

function recurring (name){
    var object = getCityByName(name);
    var visitedTime = [];
    var visited = [];
    console.log(object)
    if (hasFirestation(object)){
        return "found"
    }else{
        console.log("dive deeper");
        object.nodes.forEach(el=>{visitedTime.push(el.time)})
        object.nodes.forEach(el=>{
            if(el.cities[0]!==object.name){
                visited.push(el.cities[0])
            }else{visited.push(el.cities[1])
            }})

        console.log(visitedTime);
        console.log(visited)
    }
    // var nodeDeeper = getCityByName(object.nodes[0].cities[0])


    // var deeperNodes = object.nodes.map(el=> recurring(el.cities[1]))
    // console.log(deeperNodes)

}

recurring("A");
