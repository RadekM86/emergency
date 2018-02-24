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

var firestations = cityMap.filter(el=>el.firestation===true);

function getCityByName(name){
    var result = cityMap.filter(el=>el.name===name)
    return result[0]
}

let relativeDatabase = (cityMap, parent)=>{
    let node = {}
    cityMap
    .filter(el=>el.parent===parent)
    .forEach(el=>
    node[c.name] = relativeDatabase(categories, c.name) )
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
var comeFrom = "";
function pathFinder(name){
    var object = getCityByName(name);
    console.log("I'm in: " + object.name);
    console.log(object)
    console.log("come from: " + comeFrom)
    if(object.firestation===true ){
        console.log("found it!");
        return true;
    }else{
        if(comeFrom!==object.name){
            for(let i=0; i<object.nodes.length; i++){
                comeFrom=object.nodes[i].cities;
                var looking=getCityByName(object.nodes[i].cities);
                console.log(looking.nodes);
                if(pathFinder(looking.name)){
                    console.log("found it...")
                    return true
                }return false
            }return false
        }

        console.log("false")
    }
}

// && route.time.reduce((prev,curr)=>{return prev+curr})<=10)
var searchTimesArray = [];

let reversedBFS = (name, goal, time) =>{
    let object = getCityByName(name);
    console.log("I'm in: " + object.name + " looking for " + goal);
    let nodesArray = object.nodes.map(el=>el.cities);
    let timesArray = object.nodes.map(el=>el.time);
    console.log("nodes array " + nodesArray);
    console.log("times array " + timesArray)
    let searchTime = timesArray[nodesArray.indexOf(goal)]+time;
    searchTimesArray.push(searchTime)
    if ((nodesArray.indexOf(goal)!==-1)&&(searchTime<=10)){
        console.log("found " + goal + " in " + searchTime)
        console.log("search times: " + searchTimesArray)
        return true
    }else{
        object.nodes.forEach(el=> reversedBFS(el.cities, goal, el.time))
    }
}

//lets look from ends to start
let search = (goal) => {
    searchTimesArray = [];
    let firestationsNames = firestations.map(el=>el.name);
    console.log(firestationsNames)
    if (firestationsNames.indexOf(goal)!==-1){
        console.log("found it!!!!!")
        return true
    }else{
        firestations.forEach(el=> {
            if(reversedBFS(el.name, goal, 0)===true){
                return true
            }return false
        }
    
    )
    }
}

let shortestWay = (name)=>{
    var fastestResponse = searchTimesArray.sort((a, b)=>{return a-b})
    do{
        console.log("found it in " + fastestResponse[0])
        search(name)
    }
    while(fastestResponse[0]>10);
    return true
}

shortestWay("A")