// shortest path algorithm in weighted undirected graph

function City(name, firestation, nodes){
    this.name=name;
    this.firestation = firestation;
    this.nodes = nodes;
}

function Nodes(cities, time){
    this.name = cities.join("");
    this.time = time
}

var max = 10;
var cities = [{name: "A", firestation: false}, {name: "B", firestation: true}, {name: "C", firestation: false}, {name: "D", firestation: false}, {name: "E", firestation: false}, {name: "F", firestation: false}, {name: "G", firestation: true}, {name: "W", firestation: false}];
var roads = [{name: ["A", "B"], time: 4}, {name: ["B", "C"], time: 1}, {name: ["A", "C"], time: 8}, {name: ["D", "E"], time: 3}, {name: ["F", "A"], time: 5},{name:["F", "C"], time:5},{name: ["C", "G"], time: 1},{name: ["D", "B"], time: 7}, {name: ["A", "W"], time: 12}];

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


var cityMap = cityBuilder(cities);

var firestations = cityMap.filter(el=>el.firestation===true);



function getCityByName(name){
    var result = cityMap.filter(el=>el.name===name)
    return result[0]
}




let dijkstra = (current, firestations, time, unvisited) =>{
    let currentObject = getCityByName(current);
    unvisited = unvisited.filter(el=>el.name!==current)
    console.log(unvisited);
    console.log(currentObject)
    if(currentObject.firestation===true){
        console.log("found");
        return true
    }else{
        if(time<max){
        let nodes = currentObject.nodes.map(el=>getCityByName(el.name))
        let times = currentObject.nodes.map(el=> el.time)
        console.log('looking further')
        for(let i = 0; i<nodes.length;i++){
            if(times[i]>max){
              nodes.splice(i,1);
              times.splice(i,1)
            }
        }
        let firestationsInRange = nodes.filter(el=>el.firestation===true);
        console.log(nodes)
        console.log(firestationsInRange)
        console.log(times)
        if(firestationsInRange.length>0){
            console.log('found it in range')
            return true
        }else{
            console.log(unvisited);
            let foundRoutesArray = []
            currentObject.nodes.forEach(el=>{
                if(dijkstra(el.name, firestations, el.time+time, unvisited)===true){
                    foundRoutesArray.push(true)
                }else{
                    return false
                }
            })
            if(foundRoutesArray.length>0){
                console.log("found it anyway")
                return true
            }
            return false
        }
    }else{
        return false
    }
    }
}



if(dijkstra("W", firestations, 0, cityMap)===true){
    console.log('it returns true')
}else[
    console.log('it returns false')
]


