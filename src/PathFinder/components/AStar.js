import React, { Component } from "react";

export class AStar extends Component {
  render() {
    return (
      <div className="mt-3 d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-success"
          onClick={() => this.visualizeDjikstra()}
        >
          Visualize A* Algorithm
        </button>
        <span>&nbsp;</span>
        <button class="btn btn-primary">
          <span class="glyphicon glyphicon-refresh"></span> Reset
        </button>
      </div>
    );
  }
}
