import React, { useReducer } from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React, { useReducer } from "react";
// import ReactDOM from "react-dom";

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        number: state.number - 1,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, { number: 0 });

  return (
    <div>
      <h1>{state.number}</h1>
      <button
        onClick={() => {
          dispatch({ type: INCREMENT });
        }}
      >
        INCREMENT
      </button>
      <button
        onClick={() => {
          dispatch({ type: DECREMENT });
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

ReactDOM.render(<App />, document.getElementById("root"));
