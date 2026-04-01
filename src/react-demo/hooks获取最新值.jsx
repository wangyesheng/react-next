// import React, { useEffect, useState } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [num, setNum] = useState(0);
  const numRef = useRef(num);
  useEffect(() => {
    setTimeout(() => {
      console.log(numRef.current);
    }, 3000);
  }, []);
  return (
    <div>
      <h1>{num}</h1>
      <button
        onClick={() => {
          setNum(num + 1);
          numRef.current = num + 1;
        }}
      >
        +
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
