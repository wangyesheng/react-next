import React, { useState, useEffect, useCallback } from "./libs/react";
import ReactDOM, { useRef } from "./libs/react-dom";

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";

// function App() {
//   const [num, setNum] = useState(0);
//   const add = useCallback(() => {
//     setNum(10);
//     setTimeout(() => {
//       // setNum((s) => s + 1);
//       setNum(num + 1);
//     }, 1000);
//   }, [num]);

//   return (
//     <div>
//       <h1>{num}</h1>
//       <button onClick={add}>ADD</button>
//     </div>
//   );
// }

// function App() {
//   const [num, setNum] = useState(0);
//   const numRef = useRef(num);
//   function add() {
//     setNum(num + 1);
//   }
//   useEffect(() => {
//     numRef.current = num;
//     setTimeout(() => {
//       console.log(numRef.current);
//     }, 3000);
//   });
//   return (
//     <div>
//       <h1>{num}</h1>
//       <button onClick={add}>Add</button>
//     </div>
//   );
// }

function App() {
  const [num, setNum] = useState(0);
  const add = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  return (
    <div>
      <h1>{num}</h1>
      <button onClick={add}>Add</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
