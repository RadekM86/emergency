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

var cities = [{name: "A", firestation: false}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}, {name: "F", firestation: false}, {name: "G", firestation: true}];
var roads = [{cities: ["A", "B"], time: 4}, {cities: ["B", "C"], time: 10}, {cities: ["A", "C"], time: 8}, {cities: ["D", "E"], time: 3}, {cities: ["F", "A"], time: 53},{cities:["F", "C"], time:5},{cities: ["C", "G"], time: 6},{cities: ["B", "D"], time: 7}];

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


function getCityByName(name){
    var result = cityMap.filter(el=>el.name===name)
    return result[0]
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
var visitedTime = [];
var visited = [];
var unvisited=[];
cityMap.forEach(el=>{
        unvisited.push(el.name)
})
function recursive (name){
    var object = getCityByName(name);
    unvisited.splice(unvisited.indexOf(name), 1) 
    console.log(`unvisiteeeeeed ${unvisited}`)

    if (hasFirestation(object)||unvisited.length===0){
        console.log("found!!!!!!!!!!!!!!!!!");
    return 
    }else{
        object.nodes.forEach(el=>{visitedTime.push(el.time)})
        object.nodes.forEach(el=>{
            if(el.cities[0]!==object.name){
                visited.push(el.cities[0])
            }else{visited.push(el.cities[1])
            }})
        console.log("visited time __________")
        console.log(visitedTime);
        console.log("visited time __________")
        console.log(visited)
        var citiesInRange = [];
        var range = visitedTime.filter((el, index)=>{
             if(el<=10){
                 citiesInRange.push(visited[index])
                 visitedTime[index]=visitedTime[index] + el
             }return el<=10
            })

        console.log(citiesInRange);
        console.log(range)
        console.log("dive deeper");
        var deeperNodes = [];
        citiesInRange.forEach(el=>deeperNodes.push(getCityByName(el)))
        console.log(deeperNodes)
         if(range.length>0){
            for (let i=0; i<deeperNodes.length; i++){
            recursive(deeperNodes[i].name);
            return 
        }}
    }

    // deeperNodes.forEach(el=>recursive(el.name))
    // var deeperNodes = object.nodes.map(el=> recurring(el.cities[1]))
    // console.log(deeperNodes)

}

recursive("F");
