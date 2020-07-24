export function bfs(grid, startNode, finishNode) {
  const queue = [];
  const visitedNodes = [];
  var unvisitedNodes = getAllNodes(grid);
  queue.push(startNode);
  startNode.isVisited = true;
  //   startNode.distance = 0;
  while (queue.length != 0) {
    const node = queue.shift();
    //if node is finish node then return the queue it contains all nodes
    if (node == finishNode) {
      return [visitedNodes, backtrack(finishNode)];
    }
    if (node.isWall) continue;
    //get all neighbours of the current node
    const neighbours = getUnvisitedNeighbors(node, grid);
    for (const neighbour of neighbours) {
      // if (neighbour.isVisited) continue;
      if (neighbour.isWall) continue;
      queue.push(neighbour);
      visitedNodes.push(neighbour);
      neighbour.isVisited = true;
      neighbour.parent = node;
    }
  }
  return [visitedNodes, backtrack(finishNode)];
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

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { c, r } = node;
  if (r > 0) neighbors.push(grid[r - 1][c]);
  if (r < grid.length - 1) neighbors.push(grid[r + 1][c]);
  if (c > 0) neighbors.push(grid[r][c - 1]);
  if (c < grid[0].length - 1) neighbors.push(grid[r][c + 1]);
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

function backtrack(finishNode) {
  const nodesInShortestPath = [];
  let current = finishNode;
  while (current != null) {
    nodesInShortestPath.unshift(current);
    current = current.parent;
  }
  return nodesInShortestPath;
}
// exports.backtrace = backtrace;

// export function getNodesInShortestPath(finishNode) {
//   const nodesInShortestPathOrder = [];
//   let currentNode = finishNode;
//   while (currentNode !== null) {
//     nodesInShortestPathOrder.unshift(currentNode);
//     currentNode = currentNode.previousnode;
//   }
//   return nodesInShortestPathOrder;
// }

// function sortNodesByDistance(unvisitedNodes) {
//   unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
// }

// function updateUnvisitedNeighbors(node, grid) {
//   const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//   for (const neighbor of unvisitedNeighbors) {
//     neighbor.distance = node.distance + 1;
//     neighbor.previousnode = node;
//   }
// }

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
