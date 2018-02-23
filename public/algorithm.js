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
var roads = [{cities: ["A", "B"], time: 4}, {cities: ["B", "C"], time: 10}, {cities: ["A", "C"], time: 8}, {cities: ["D", "E"], time: 3}, {cities: ["F", "A"], time: 53},{cities:["F", "C"], time:5},{cities: ["C", "G"], time: 1},{cities: ["B", "D"], time: 7}];

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
    unvisited.splice(unvisited.indexOf(name), 1) 
    console.log(`unvisited ${unvisited}`)
    console.log(object.nodes);
    var deeperNodes = [];
    if(unvisited.length===0){
        return false
    }else{
    for(let i=0; i<object.nodes.length;i++){
        var otherCity = "";
        if(object.nodes[i].cities[0]===object.name){
            otherCity=object.nodes[i].cities[1];
        }else{
            otherCity=object.nodes[i].cities[0]
        }
        deeperNodes.push(otherCity)
        if(object.nodes[i].time>10){
            dontGo.push(otherCity)
        }
        dontGo.push(object.name)
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
    go.forEach(recursive)
    }

}
    // for(let i=0; i<dontGo.length;i++){
    //     deeperNodes.splice(deeperNodes.indexOf(dontGo[i]), 1)
    // }
    // if(deeperNodes.length===0){
    //     return false
    // }else{
    //     console.log("dive deeper");
    //     console.log(deeperNodes)
    // }

  



    // if(object.nodes.some(el=>{
    //     el.cities[0].firestation===true || el.cities[1].firestation===true
    // })){
    //     console.log("boo");
    //     return
    // }else{
    //     if (unvisited.length===0){
    //         console.log("found")
    //     return 
    //     }else{
    //         object.nodes.forEach(el=>{visitedTime.push(el.time)})
    //         object.nodes.forEach(el=>{
    //             if(el.cities[0]!==object.name){
    //                 visited.push(el.cities[0])
    //             }else{visited.push(el.cities[1])
    //             }})
    //         var citiesInRange = [];
    //         var range = visitedTime.filter((el, index)=>{
    //              if(el<=10){
    //                  citiesInRange.push(visited[index])
    //                  visitedTime[index]=visitedTime[index] + el
    //              }return el<=10
    //             })
    //         console.log("dive deeper");
    //         console.log(citiesInRange)
    //         var deeperNodes = [];
    //         citiesInRange.forEach(el=>deeperNodes.push(getCityByName(el)))
    //         console.log(deeperNodes)
    //         console.log("big things happen now")
    //          if(range.length>0){
    //             for (let i=0; i<deeperNodes.length; i++){
    //             recursive(deeperNodes[i].name);
    //             return 
    //         }}
    //     }
    
    // }
    



recursive("F");
