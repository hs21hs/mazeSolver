const container = document.getElementById("container");
const solveMazeButton = document.getElementById("solve-maze-button");
const standardMaze = 
[
    [0,0,0,0,1,0,0,1,0],
    [1,1,0,0,0,1,0,1,0],
    [0,0,0,1,1,0,0,1,0],
    [0,1,1,1,0,1,0,1,0],
    [0,0,0,0,0,1,0,0,0],
    [0,1,1,1,1,0,0,0,0],
    [0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0],
    [0,0,1,0,1,1,1,0,0],
    [0,0,1,1,0,0,0,1,0],
    [0,0,0,0,0,0,0,1,0]
]

function makeMaze(maze) {
container.innerHTML = ''


maze.forEach((e,r) => {
  let row = document.createElement("div");
  container.appendChild(row).className = "row"
  e.forEach((x,c) => {
    let cell = document.createElement("div");
    cell.id = [r,c]

    if (r === 0 && c === 0){cell.innerText = "start"}
    if (r === maze.length-1 && c === e.length-1){cell.innerText = "end"}

    if(x===0){row.appendChild(cell).className = "open-cell";}
    if(x===1){row.appendChild(cell).className = "closed-cell";}
    if(x===2){row.appendChild(cell).className = "path-cell";}

    cell.onclick =(e)=>{changeMaze(standardMaze,e)}
  })
})

}

solveMazeButton.onclick = ()=>{makeMaze(dijkstra(standardMaze,{x:0,y:0},{x: standardMaze.length-1, y:standardMaze[standardMaze.length-1].length-1}))}
makeMaze(standardMaze);


function changeMaze(maze,e){
  
  const coordinates = e.target.id

  if(maze[coordinates[0]][coordinates[2]] === 0){
    maze[coordinates[0]][coordinates[2]] = 1
  }else{
    maze[coordinates[0]][coordinates[2]] = 0
  }
makeMaze(standardMaze)
}






function dijkstra(maze, startCoordinates, endCoordinates){
  
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
      heap = [...heap, ...nodesToCheck]
      
      currentNode.visited = true
      if(currentNode.start === false){heap.shift()}
      heap.sort(function(a, b) {return a.shortestPath.val - b.shortestPath.val;});
      //console.log(yyy, "c", currentNode, "h", heap)
      currentNode = heap[0]
      yyy++
      if(heap.length === 0) checker = false

  }    
  const finalPath = []
  showPath(mazeWDetails, end.x, end.y, finalPath)
  
  return originalWithPath(maze,finalPath)
  
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
      if(maze[node.coordinates.x+1][node.coordinates.y]){
          
      }
          if(maze[node.coordinates.x+1][node.coordinates.y].visited === false && maze[node.coordinates.x+1][node.coordinates.y].deadEnd === false){arr.push(maze[node.coordinates.x+1][node.coordinates.y])}
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
