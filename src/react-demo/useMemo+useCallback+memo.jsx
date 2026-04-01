import React, { useState, useCallback, useMemo } from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React, { useState, memo, useMemo, useCallback } from "react";
// import ReactDOM from "react-dom";

function Counter1({ value, changeValue, children }) {
  console.log("Counter1 render");
  return (
    <div>
      <h1>{value}</h1>
      <button onClick={() => changeValue(1)}>change</button>
    </div>
  );
}

const MemoCouter = React.memo(Counter1);

function App() {
  const [num, setNum] = useState(0);
  const [name, setName] = useState("");
  console.log("App render");
  const memoNum = useMemo(() => num, [num]);
  const memoCallback = useCallback(
    (payload) => {
      setNum(num + payload);
    },
    [num]
  );
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MemoCouter value={memoNum} changeValue={memoCallback} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
