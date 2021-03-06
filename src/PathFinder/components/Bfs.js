import React from "react";

const Bfs = (props) => {
  console.log(props.func);
  return (
    <div className="mt-3 d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-success"
        onClick={() => props.func()}
      >
        Visualize Breadth First Search Algorithm
      </button>
      <span>&nbsp;</span>
      <button
        class="btn btn-primary"
        onClick={() => {
          window.location.reload();
        }}
      >
        <span class="glyphicon glyphicon-refresh"></span> Reset
      </button>
    </div>
  );
};

export default Bfs;
