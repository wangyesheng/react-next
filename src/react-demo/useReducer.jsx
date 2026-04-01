// import React, { useReducer, useState, useCallback } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { useReducer, useState, useCallback } from "react";
import ReactDOM from "react-dom";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, 1000);
  });
}

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        number: state.number + action.value,
      };
    case DECREMENT:
      return {
        number: state.number - action.value,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { number: 100 });

  return (
    <div>
      <h1>{state.number}</h1>
      <button
        onClick={async () => {
          dispatch({ type: INCREMENT, value: 10 });
          const data = await getData();
          dispatch({ type: INCREMENT, value: data });
        }}
      >
        INCREMENT
      </button>
      <button
        onClick={() => {
          dispatch({ type: DECREMENT, value: 10 });
        }}
      >
        DECREMENT
      </button>
    </div>
  );
}

function UseStateHook() {
  const [state, setState] = useState(100);
  const onAdd = useCallback(async () => {
    const data = await getData();
    setState(state + data);
  }, [state]);
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onAdd}>INCREMENT</button>
      <button
        onClick={() => {
          setState(state - 1);
        }}
      >
        DECREMENT
      </button>
    </div>
  );
}

// function Counter() {
//   const [num, setNum] = useState(0);
//   function add() {
//     setNum(100);
//     setTimeout(() => {
//       setNum(num + 1);
//     }, 1000);
//   }
//   return (
//     <div>
//       <h1>{num}</h1>
//       <button onClick={add}>Click</button>
//     </div>
//   );
// }

ReactDOM.render(<UseStateHook />, document.getElementById("root"));
