// import React, { useCallback, useRef } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { useCallback, useEffect, useRef, useState } from "react";
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

ReactDOM.render(<GetLastestValue />, document.getElementById("root"));
