// shortest path algorithm in weighted undirected graph

function City(name, firestation){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodefinder(this.name);
}

function Road(time){
        this.name=name;
        this.time=time
}

function Route(time){
    this.time = time
}

var cities = [{name: "A", firestation: false}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}, {name: "F", firestation: false}, {name: "G", firestation: true}];
var roads = [{cities: ["A", "B"], time: 4}, {cities: ["B", "C"], time: 10}, {cities: ["A", "C"], time: 8}, {cities: ["D", "E"], time: 3}, {cities: ["F", "A"], time: 5},{cities:["F", "C"], time:5},{cities: ["C", "G"], time: 1},{cities: ["B", "D"], time: 7}];

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

function isTooFar(element, index, array) {
    return (element > 10);
  }



var visitedTime = [];
var visited = [];
var unvisited=[];
var dontGo=[]
cityMap.forEach(el=>{
        unvisited.push(el.name)
})


function recursive (name){
    var object = getCityByName(name);
    console.log("im in: " + object.name)
    if(object.firestation){
        console.log("found it");
        return true
    } else{
    unvisited.splice(unvisited.indexOf(name), 1) 
    console.log(`unvisited ${unvisited}`)
    console.log(object.nodes);
    var deeperNodes = [];
    if(unvisited.length<1){
        console.log('poop')
        return false
    }else{
    for(let i=0; i<object.nodes.length;i++){
        var otherCity = "";
        visitedTime.push(object.nodes[i].time)
        var route = new Route(visitedTime.reduce((prev,curr)=>{return prev+curr}));
        if (route.time<=10){
            console.log("record time")
            return true
        }
        if(object.nodes[i].cities[0]===object.name){
            otherCity=object.nodes[i].cities[1];
        }else{
            otherCity=object.nodes[i].cities[0]
        }
        deeperNodes.push(otherCity)
        if(object.nodes[i].time>10){
            dontGo.push(otherCity)
         }else if(otherCity.firestation===true){
                console.log("found it");
                return true
         }

        dontGo.push(object.name);
        visited.push(object.name)
    }

    console.log(deeperNodes)
    console.log('dontGo '+ dontGo)
    deeperNodes.filter(el=>{
        if(dontGo.includes(el)){
            deeperNodes.splice(deeperNodes.indexOf(el), 1)
        }
    })
    var go = deeperNodes;
    console.log(go);
    console.log(route)
    console.log(`visited ${visited}`)
    go.forEach(recursive)
    }
}
}
recursive("A");
