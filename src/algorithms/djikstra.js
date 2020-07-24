// const node = {
//   r,
//   c,
//   isvisited,
//   distance,
// };
// function djikstra(gridd, startnode, finishnode) {
//   //edge case,no startnode,no finishnode,no overlap
//   if (!startnode || !finishnode || startnode == finishnode) {
//     return false;
//   }
//   //start node initially at 0 distance w itself so update
//   grid[startnode].distance = 0;
//   const unvisitednodes = grid.slice();
//   while (!!unvisitednodes.length) {
//     //visit then update all neighbours,L,R,U,D
//     sortNodesbyDistance(unvisitednodes);
//     const closestnode = unvisitednodes.unshift();
//     closestnode.isvisited = true;
//     if (closestnode === finishnode) return "success";
//     updateNeighbours(closestnode, gridd);
//   }
// }

// function sortNodesbyDistance(unvisitednodes) {
//   unvisitednodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// }
// function updateNeighbours(node, gridd) {
//   const neighbours = getNeighbours(node, gridd);
//   for (const neighbour of neighbours) {
//     neighbour.distance = node.distance + 1;
//   }
// }
// function getNeighbours(node, gridd) {
//   const neighbours = [];
//   const { c, r } = node;
//   if (r > 0) neighbours.push(gridd[r - 1][c]);
//   if (r < gridd.length - 1) neighbours.push(gridd[r + 1][c]);
//   if (c > 0) neighbours.push(gridd[r][c - 1]);
//   if (c < gridd[0].length - 1) neighbours.push(gridd[r][c + 1]);
// }
export function djikstra(grid, startNode, finishNode) {
  const visitedNodes = [];
  startNode.distance = 0;

  const unvisitedNodes = getAllNodes(grid);
  //has all nodes of the graph now i.e. 20*50 nodes
  while (!!unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // console.log(closestNode);
    // If we encounter a wall, we skip it.
    if (closestNode.isWall) continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop amd return visited nodes
    if (closestNode.distance === Infinity) return visitedNodes;
    closestNode.isVisited = true;
    //making true for backtracking
    visitedNodes.push(closestNode);
    if (closestNode === finishNode) return visitedNodes;
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const r of grid) {
    for (const node of r) {
      nodes.push(node);
      // console.log(node);
    }
  }
  return nodes;
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousnode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { c, r } = node;
  if (r > 0) neighbors.push(grid[r - 1][c]);
  if (r < grid.length - 1) neighbors.push(grid[r + 1][c]);
  if (c > 0) neighbors.push(grid[r][c - 1]);
  if (c < grid[0].length - 1) neighbors.push(grid[r][c + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousnode;
  }
  return nodesInShortestPathOrder;
}
