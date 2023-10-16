import React, { useReducer, useContext } from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React, { createContext, useContext, useReducer } from "react";
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

const AppContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, { number: 0 });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Counter />
    </AppContext.Provider>
  );
}

function Counter() {
  const { state, dispatch } = React.useContext(AppContext);
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

ReactDOM.render(<App />, document.getElementById("root"));
