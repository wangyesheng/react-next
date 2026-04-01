// import React, { useEffect, useState } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]);
    }, 1000);
  });
}

function useRequest() {
  console.log("useRequest");
  const [data, setData] = useState([]);
  async function loadMore() {
    setData(null);
    const result = await getData();
    // data 因为闭包的缘故，始终是上层作用域 data 的值
    setData([...data, ...result]);
  }
  useEffect(() => {
    loadMore();
  }, []);
  return [data, loadMore];
}

function App() {
  const [nums, loadMore] = useRequest();
  return (
    <div>
      <button onClick={() => loadMore()}>+</button>
      {nums ? nums.map((n, i) => <h3 key={i}>{n}</h3>) : <div>加载中...</div>}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
