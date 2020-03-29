Array.prototype.unique = function() {
  return this.filter(function (value, index, self) { 
    return self.indexOf(value) === index;
  });
}


const betterForDijkstra =
[
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
]

const betterForAStar =
[
  [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
  [1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0],
  [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]


const container = document.getElementById("container");
const solveMazeButton = document.getElementById("solve-maze-button");
const selectAlgo = document.getElementById("select-algo");
const selectMaze = document.getElementById("select-maze");
let standardMaze = betterForDijkstra


function makeMaze(maze) {
  //put everything in here in timeout it will show algo little bit
    container.innerHTML = ''
    console.log(maze)
    maze.forEach((e,r) => {
      let row = document.createElement("div");
      row.id = r
      container.appendChild(row).className = "row"
      e.forEach((x,c) => {
        let cell = document.createElement("div");
        cell.id = c
    
        if(x===0){row.appendChild(cell).className = "open-cell";}
        if(x===1){row.appendChild(cell).className = "closed-cell";}
        if(x===2){row.appendChild(cell).className = "path-cell";}
        if(x===3){row.appendChild(cell).className = "current-cell";}
        if(x===4){row.appendChild(cell).className = "heap-cell";}

        if (r === 0 && c === 0){
          cell.innerText = "S"
          cell.className = "fit-to-div"
        }
        if (r === maze.length-1 && c === e.length-1){
          cell.innerText = "E"
          cell.className = "fit-to-div"
        }
        
        cell.onclick =(e)=>{changeMaze(standardMaze,e)}
      })
    })
  
}

solveMazeButton.onclick = ()=>{solveMaze(selectAlgo.value)}
selectMaze.onchange = (e) => {
  if (e.target.value === "dijkstra"){ standardMaze = betterForDijkstra}
  if (e.target.value === "aStar"){ standardMaze = betterForAStar}
  makeMaze(standardMaze)
}
makeMaze(standardMaze);


function solveMaze(algo){
  if(algo === "dijkstra"){
    const obj = dijkstra(standardMaze,{x:0,y:0},{x: standardMaze.length-1, y:standardMaze[standardMaze.length-1].length-1},true)
    showAlgoPath(obj.arrayOfHeaps, obj.originalWithPath, algo)
  }
  else if(algo === "aStar"){
    const obj = aStar(standardMaze,{x:0,y:0},{x: standardMaze.length-1, y:standardMaze[standardMaze.length-1].length-1},true)
    showAlgoPath(obj.arrayOfCurrentNodes, obj.originalWithPath, algo)
  }
  
}

function changeMaze(maze,e){
  
  const coloumnCoordinate = e.target.id
  const rowCoordinate = e.target.parentNode.id
  

  if(maze[rowCoordinate][coloumnCoordinate] === 0){
    maze[rowCoordinate][coloumnCoordinate] = 1
  }else{
    maze[rowCoordinate][coloumnCoordinate] = 0
  }
  
makeMaze(standardMaze)
}


function showAlgoPath(arrayOfVisitedNodes, originalWithPath, algo){

  if(algo === "dijkstra"){
    console.log('algo time')
    let to= 20

    const copy = standardMaze.map((x) => {
      return(x.map((y)=>{return y}))
    })

    arrayOfVisitedNodes.forEach(async (heapObj)=>{
      
      to+=20
      setTimeout(()=>{
        const x = heapObj.currentNode.coordinates.x
      const y = heapObj.currentNode.coordinates.y
      copy[x][y] = 3
      // for(let i= 0; i< heapObj.heap.length-1; i++){
      //   const x = heapObj.heap[i].coordinates.x
      //   const y = heapObj.heap[i].coordinates.y
      //   copy[x][y] = 4
      // }
      //console.log(heapObj.currentNode.coordinates, heapObj.heap)

        makeMaze(copy)
      },to) 
    })
    setTimeout(()=>{makeMaze(originalWithPath)},to)
  }
  
  if(algo === "aStar"){
    console.log('aStar algo time')
    let to= 20
    
    const copy = standardMaze.map((x) => {
      return(x.map((y)=>{return y}))
    })

    arrayOfVisitedNodes.forEach(async (node)=>{
      to+=20
      setTimeout(()=>{
        const x = node.coordinates.x
        const y = node.coordinates.y
        copy[x][y] = 3
        console.log(copy)
        makeMaze(copy)
      },to) 
    })
    setTimeout(()=>{makeMaze(originalWithPath)},to)
  }
  
  
}



function dijkstra(maze, startCoordinates, endCoordinates){
  
  const arrayOfHeaps = []

  const mazeWDetails = getMazeWDetails(maze)
  const start = {x: startCoordinates.x, y: startCoordinates.y}
  const end = {x: endCoordinates.x, y: endCoordinates.y}
  const startNode = mazeWDetails[start.x][start.y]
  const endNode = mazeWDetails[end.x][end.y]

  startNode.start = true 
  endNode.end = true
  startNode.shortestPath.val = 0

  let checker = true
  let currentNode = startNode
  let heap = []
  let yyy = 0

  //relax the connected nodes and add to heap
  //remove the current node from top of the heap(unless ur on start)
  //choose the cheapest node in heap and make it current node
  while(checker === true){
      
      const nodesToCheck = getNodesToCheck(currentNode, mazeWDetails)
      relaxsation(nodesToCheck, currentNode)
      heap = [...heap, ...nodesToCheck].unique()
      
      const heapAndCurrentNode = {currentNode: currentNode, heap: heap}
      arrayOfHeaps.push(heapAndCurrentNode)

      currentNode.visited = true
      if(currentNode.start === false){heap.shift()}
      heap.sort(function(a, b) {return a.shortestPath.val - b.shortestPath.val;});
      //console.log(yyy, "c", currentNode, "h", heap)
      currentNode = heap[0]
      yyy++
      if(currentNode.coordinates.x === end.x && currentNode.coordinates.y === end.y) checker = false

  }    
  const finalPath = []
  showPath(mazeWDetails, end.x, end.y, finalPath)

  return ({arrayOfHeaps: arrayOfHeaps, originalWithPath: originalWithPath(maze,finalPath)})
  
}

function aStar(maze, startCoordinates, endCoordinates){
  console.log("astar")
  const arrayOfCurrentNodes = []

  const start = {x: startCoordinates.x, y: startCoordinates.y}
  const end = {x: endCoordinates.x, y: endCoordinates.y}
  const mazeWDetails = getAStarMazeWDetails(maze,end)
  const startNode = mazeWDetails[start.x][start.y]
  const endNode = mazeWDetails[end.x][end.y]
  

  startNode.start = true 
  endNode.end = true
  startNode.shortestPath.val = 0

  let checker = true
  let currentNode = startNode
  let heap = []
  let yyy = 0

  mazeWDetails.forEach((r) => {
    r.forEach((e) => {if(e.visited === false && e.deadEnd === false){heap.push(e)}})
  })

  //relax the connected nodes and add to heap
  //remove the current node from top of the heap(unless ur on start)
  //choose the cheapest node in heap and make it current node
  while(checker === true){
      console.log(currentNode.coordinates)
      const nodesToCheck = getNodesToCheck(currentNode, mazeWDetails)
      relaxsation(nodesToCheck, currentNode)
      
      arrayOfCurrentNodes.push(currentNode)

      currentNode.visited = true
      heap.shift()
      
      heap.sort(function(a, b) {
        let aVal =0
        let bVal =0
        if(a.shortestPath.val === "infinity"){aVal = 10000000}else{aVal = a.shortestPath.val+a.heuristic}
        if(b.shortestPath.val === "infinity"){bVal = 10000000}else{bVal = b.shortestPath.val+b.heuristic}
      
        return (aVal-bVal);
      });
      //console.log('heap', heap[0],heap[1],heap)
      //console.log(yyy, "c", currentNode, "h", heap)
      currentNode = heap[0]
      yyy++
      if(currentNode.coordinates.x === end.x && currentNode.coordinates.y === end.y) checker = false

  }    
  const finalPath = []
  showPath(mazeWDetails, end.x, end.y, finalPath)
  //console.log(mazeWDetails)
  return ({arrayOfCurrentNodes: arrayOfCurrentNodes, originalWithPath: originalWithPath(maze,finalPath)})
  
}

function originalWithPath(original, path){

  const copy = original.map((x) => {
    return(x.map((y)=>{return y}))
  })

  for(let i=0; i<path.length; i++){
      copy[path[i].x][path[i].y] = 2
  }

  return copy
}

function showPath(solvedArray, x, y, finalPath){
  if(solvedArray[x]){
      if(solvedArray[x][y] && solvedArray[x][y].shortestPath.previousNode){
          const xC = solvedArray[x][y].shortestPath.previousNode.coordinates.x
          const yC = solvedArray[x][y].shortestPath.previousNode.coordinates.y
          finalPath.unshift({x:xC, y:yC})
          showPath(solvedArray, xC, yC,finalPath)
      }
  }
}

function relaxsation(nodesToCheck, currentNode){
  for (let i = 0; i < nodesToCheck.length; i++){
      if(nodesToCheck[i].shortestPath.val > currentNode.shortestPath.val+1 || nodesToCheck[i].shortestPath.val === "infinity"){
          nodesToCheck[i].shortestPath.val = currentNode.shortestPath.val+1
          nodesToCheck[i].shortestPath.previousNode = currentNode
      }
  }
}

function getNodesToCheck(node,maze){
  const arr = []
  if(maze[node.coordinates.x]){
      if(maze[node.coordinates.x][node.coordinates.y-1] && maze[node.coordinates.x][node.coordinates.y-1].visited === false && maze[node.coordinates.x][node.coordinates.y-1].deadEnd === false){arr.push(maze[node.coordinates.x][node.coordinates.y-1])}
  }
  if(maze[node.coordinates.x]){
      if(maze[node.coordinates.x][node.coordinates.y+1] && maze[node.coordinates.x][node.coordinates.y+1].visited === false && maze[node.coordinates.x][node.coordinates.y+1].deadEnd === false){arr.push(maze[node.coordinates.x][node.coordinates.y+1])}
  }
  if(maze[node.coordinates.x-1]){
      if(maze[node.coordinates.x-1][node.coordinates.y] && maze[node.coordinates.x-1][node.coordinates.y].visited === false && maze[node.coordinates.x-1][node.coordinates.y].deadEnd === false){arr.push(maze[node.coordinates.x-1][node.coordinates.y])}
  }
  if(maze[node.coordinates.x+1]){
      if(maze[node.coordinates.x+1][node.coordinates.y] && maze[node.coordinates.x+1][node.coordinates.y].visited === false && maze[node.coordinates.x+1][node.coordinates.y].deadEnd === false){arr.push(maze[node.coordinates.x+1][node.coordinates.y])}
  }
  const heap = arr.sort(function(a, b) {
      return a.shortestPath.val - b.shortestPath.val;
    });
  return heap
}

function getMazeWDetails(maze){
  const mazeWDetails = maze.map((row, x) => {
      return row.map((node, y) => {
          let deadEndVal = null
           if (node === 0) {deadEndVal = false} else {deadEndVal = true}
          return (
              {deadEnd: deadEndVal, shortestPath:{val: "infinity", previousNode: null}, start: false, end: false, visited: false, coordinates: {x: x, y:y}}
          )
      })
   })
   return mazeWDetails
} 

function getAStarMazeWDetails(maze,end){
  const mazeWDetails = maze.map((row, x) => {
      return row.map((node, y) => {
          let deadEndVal = null
          const heuristic = Math.abs(end.x-x) + Math.abs(end.y-y)
           if (node === 0) {deadEndVal = false} else {deadEndVal = true}
          return (
              {heuristic: heuristic, deadEnd: deadEndVal, shortestPath:{val: "infinity", previousNode: null}, start: false, end: false, visited: false, coordinates: {x: x, y:y}}
          )
      })
   })
   return mazeWDetails
} 
