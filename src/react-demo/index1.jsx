// import React, { useCallback, useEffect, useRef, useState } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
  memo,
} from "react";
import ReactDOM from "react-dom";

function App() {
  const [names, setNames] = useState([]);

  const onLoadMore = useCallback(() => {
    setNames(null);
    setTimeout(() => {
      // 因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了
      setNames([...names, "tom", "lily", "kitty", "peter", "lucy"]);
    }, 1000);
  }, [names]);

  return (
    <div>
      <button onClick={onLoadMore}>load more</button>
      {names ? (
        <ul>
          {names.map((n, i) => {
            return <li key={i}>{n}</li>;
          })}
        </ul>
      ) : (
        <div>加载中...</div>
      )}
    </div>
  );
}

function GetLastestValue() {
  const [num, setNum] = useState(0);
  const numRef = useRef(num); // { current: 0 }
  const add = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  useEffect(() => {
    numRef.current = num;
    setTimeout(() => {
      console.log(numRef.current);
    }, 3000);
  });
  return (
    <div>
      <h1>{num}</h1>
      <button onClick={add}>Add</button>
    </div>
  );
}

function UpdateDemo() {
  const [num, setNum] = useState(0);
  return (
    <div>
      <h1>{num}</h1>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

function ChildCounter(props) {
  console.log("ChildCounter render", props);
  return <button onClick={props.setCount}>{props.state.count}</button>;
}

const MemoChildCounter = memo(ChildCounter);
function Counter() {
  const [name, setName] = useState("");
  const [count, setCount] = useState(0);
  console.log("Counter render");
  const childState = {
    key: Math.random(),
    count,
  };
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MemoChildCounter
        state={useMemo(() => childState, [count])}
        setCount={useCallback(() => setCount(childState.count + 1), [count])}
      />
    </div>
  );
}

ReactDOM.render(<Counter />, document.getElementById("root"));
