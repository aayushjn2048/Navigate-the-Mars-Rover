import React, { Component } from "react";
import Node from "./Node/Node";
import "./PathFinder.css";
import { djikstra, getNodesInShortestPathOrder } from "../algorithms/djikstra";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dj from "./components/Djikstra";
import { AStar } from "./components/AStar";
const SNrow = 10;
const SNcol = 15;
const FINrow = 10;
const FINcol = 35;

class PathFinder extends Component {
  constructor(props) {
    super(props);
    //initializing local state to nodes array
    this.state = {
      grid: [],
      mouseispressed: false,
    };
    this.basestate = this.state;
    // this.visualizeDjikstra = this.visualizeDjikstra.bind(this);
  }
  resetgrid = () => {
    // this.setState(this.basestate);
    // const grid = getInitialGRID();
    // this.setState({ grid });
    window.location.reload(false);
  };
  //to interact with browser,easier if you use this instead of render
  componentDidMount() {
    const grid = getInitialGRID();
    // this.addEventListeners();
    this.setState({ grid });
  }

  handleMouseDown(r, c) {
    const newgrid = getnewgridwithwalltoggle(this.state.grid, r, c);
    this.setState({ grid: newgrid, mouseispressed: true });
  }
  handleMouseEnter(r, c) {
    if (!this.state.mouseispressed) return;
    const newgrid = getnewgridwithwalltoggle(this.state.grid, r, c);
    this.setState({ grid: newgrid });
  }
  handleMouseUp(r, c) {
    this.setState({ mouseispressed: false });
  }

  animateShortestpath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      //making a copy of the grid state
      setTimeout(() => {
        const current = nodesInShortestPathOrder[i];
        document.getElementById(`node-${current.r}-${current.c}`).className =
          "node node-shortest-path";
        //updating state,leads to full rerendering
        // this.setState({ grid: newgrid });
      }, 20 * i);
    }
  }

  animateDjikstra(visnodesinorder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visnodesinorder.length; i++) {
      //making a copy of the grid state
      if (i === visnodesinorder.length) {
        setTimeout(() => {
          this.animateShortestpath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const current = visnodesinorder[i];
        // const newgrid = this.state.grid.slice();
        // const newNode = {
        //   ...current,
        //   isVisited: true,
        // };
        // newgrid[current.r][current.c] = newNode;
        document.getElementById(`node-${current.r}-${current.c}`).className =
          "node nodevisited";
        //updating state,leads to full rerendering
        // this.setState({ grid: newgrid });
      }, 10 * i);
    }
  }

  visualizeDjikstra() {
    const { grid } = this.state;
    const start = grid[SNrow][SNcol];
    const finish = grid[FINrow][FINcol];
    const visitedNodes = djikstra(grid, start, finish);
    //backtracking from final node to get start node,tracing path
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
    // console.log(visitedNodes);
    console.log(nodesInShortestPathOrder);
    this.animateDjikstra(visitedNodes, nodesInShortestPathOrder);
  }

  render() {
    //destructuring
    const { grid, mouseispressed } = this.state;
    // console.log(grid);

    return (
      <div>
        {/* <button onClick={() => this.visualizeDjikstra()}>
          Visualize Djikstra's Algorithm
        </button> */}
        <BrowserRouter>
          <div className="container">
            <Navigation />

            <Switch>
              <Route path="/" component={Home} exact />
              <Route
                exact
                path="/djikstra"
                component={() => (
                  <Dj
                    func={() => {
                      this.visualizeDjikstra();
                    }}
                  />
                )}
              />
              <Route path="/aStar" component={AStar} exact />
            </Switch>
          </div>
        </BrowserRouter>
        <button onClick={this.resetgrid}>Clear Grid</button>
        <div className="griddd">
          {grid.map((row, rowidx) => {
            return (
              <div key={rowidx}>
                {row.map((node, nodeidx) => {
                  const { r, c, isStart, isFinish, isVisited, isWall } = node;
                  return (
                    <Node
                      key={nodeidx}
                      c={c}
                      isFinish={isFinish}
                      isStart={isStart}
                      isVisited={isVisited}
                      isWall={isWall}
                      mouseispressed={mouseispressed}
                      onMouseDown={(r, c) => this.handleMouseDown(r, c)}
                      onMouseEnter={(r, c) => this.handleMouseEnter(r, c)}
                      onMouseUp={() => this.handleMouseUp()}
                      r={r}
                      // test={"foo"}
                      // test={"kappa"}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

//takes in row and column and adds these properties to nodes
const createNode = (c, r) => {
  return {
    c,
    r,
    isStart: r === SNrow && c === SNcol,
    isFinish: r === FINrow && c === FINcol,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousnode: null,
  };
};

const getInitialGRID = () => {
  const grid = [];
  for (let r = 0; r < 20; r++) {
    const currrow = [];
    for (let c = 0; c < 50; c++) {
      currrow.push(createNode(c, r));
    }
    grid.push(currrow);
  }
  return grid;
};

const getnewgridwithwalltoggle = (grid, r, c) => {
  //fetches all nodes individually
  const newgrid = grid.slice();
  const node = newgrid[r][c];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newgrid[r][c] = newNode;
  return newgrid;
};

// export default DragDropContext(HTML5Backend)(PathFinder);

export default PathFinder;
