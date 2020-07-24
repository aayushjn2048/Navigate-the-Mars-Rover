// import React,{Component} from 'react';
// // export class Djikstra extends Component {

// //     render(){
// //         return(

// //             <div className="mt-3 d-flex justify-content-center">
// //             <button type="button" class="btn btn-success" onClick={() => this.visualizeDjikstra()}>
// //             Visualize Djikstra's Algorithm
// //             </button>
// //             <span>&nbsp;</span>
// //             <button class="btn btn-primary"><span class="glyphicon glyphicon-refresh"></span> Reset</button>
// //             </div>
// //         )
// //     }

// // }

// import React from "react"

// const Dj = ({ func }) => {

//     return (

//         <div className="mt-3 d-flex justify-content-center">
//             <button type="button" class="btn btn-success" onClick={() => func}>
//                 Visualize Djikstra's Algorithm
//             </button>
//             <span>&nbsp;</span>
//             <button class="btn btn-primary"><span class="glyphicon glyphicon-refresh"></span> Reset</button>
//         </div>
//     )
// }

// export default Dj

import React from "react";

const Dj = (props) => {
  console.log(props.func);
  return (
    <div className="mt-3 d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-success"
        onClick={() => props.func()}
      >
        Visualize Djikstra's Algorithm
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

export default Dj;
