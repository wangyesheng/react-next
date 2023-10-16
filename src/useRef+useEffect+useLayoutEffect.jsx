import React, { useState, useEffect, useCallback } from "./libs/react";
import ReactDOM, { useRef } from "./libs/react-dom";

// import React, { useCallback, useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";

function App() {
  const [num, setNum] = useState(0);
  const add = useCallback(() => {
    setNum(num + 1);
  }, [num]);
  const domRef = useRef();
  useEffect(() => {
    console.log("Mounted", domRef);
    const timer = setInterval(() => {
      setNum((s) => s + 1);
    }, 1000);
    return () => {
      console.log("unmounted");
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <h1 ref={domRef}>{num}</h1>
      <button onClick={add}>ADD</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
