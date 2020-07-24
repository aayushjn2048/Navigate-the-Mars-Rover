import React, { Component } from "react";
import "./Node.css";
export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      c,
      isFinish,
      isStart,
      isVisited,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      r,
    } = this.props;
    const extraclassname = isFinish
      ? "nodefinish"
      : isStart
      ? "nodestart"
      : isWall
      ? "node-wall"
      : // : isVisited
        // ? "nodevisited"
        "";
    return (
      <div
        className={`node ${extraclassname}`}
        id={`node-${r}-${c}`}
        //only mouse press down
        onMouseDown={() => onMouseDown(r, c)}
        //hovering over element
        onMouseEnter={() => onMouseEnter(r, c)}
        //merges mouse down and up
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
// export const DEFAULT_NODE = {
//   r: 0,
//   c: 0,
// };
