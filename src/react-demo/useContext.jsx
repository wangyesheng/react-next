import React, { useReducer, useContext, useState } from "./libs/react";
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
const ColorContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, { number: 0 });
  const [textColor, setTextColor] = useState("#1890ff");

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ColorContext.Provider value={{ textColor, setTextColor }}>
        <Counter />
      </ColorContext.Provider>
    </AppContext.Provider>
  );
}

function Counter() {
  const { state, dispatch } = useContext(AppContext);
  const { textColor, setTextColor } = useContext(ColorContext);
  return (
    <div>
      <h1 style={{ color: textColor }}>{state.number}</h1>
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
      <button
        onClick={() => {
          setTextColor("#ff0000");
        }}
      >
        CHANGE COLOR
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
