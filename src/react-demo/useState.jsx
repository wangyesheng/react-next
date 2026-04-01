// import React, { useState } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

// import React, { useState } from "react";
// import ReactDOM from "react-dom";

function Counter1() {
  const [num1, setNum1] = useState(0);
  const add1 = () => {
    setNum1(num1 + 1);
  };
  console.log("Counter1");
  return (
    <div>
      <h1>{num1}</h1>
      <button onClick={add1}>Click1</button>
    </div>
  );
}

function Counter2() {
  const [num2, setNum2] = useState(0);
  const add2 = () => {
    setNum2(num2 + 1);
  };
  console.log("Counter2");
  return (
    <div>
      <h1>{num2}</h1>
      <button onClick={add2}>Click2</button>
    </div>
  );
}

function App() {
  console.log("App");
  const [num, setNum] = useState(0);
  return (
    <div>
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        AppClick
      </button>
      {num % 2 === 0 && <Counter1></Counter1>}
      <Counter2></Counter2>
    </div>
  );
}

/**
 * 同步才是hooks的思维方式
 * 每次渲染都是一个独立的闭包
 */
function SyncAndAsyncCounter() {
  let [num, setNum] = useState(0);
  const syncClick = () => {
    setNum(num + 1);
  };
  const asyncClick = () => {
    setTimeout(() => {
      // 因为每次渲染都是一个独立的闭包，所以 num 的取值永远是函数渲染时候的值
      setNum(num + 1);
      // 参数如果是函数的话，源码内部会从全局下的 hookStates 数组中根据对应索引 hookIndex 取最新的值进行操作
      // setNum((prevState) => prevState + 1);
    }, 3000);
  };
  return (
    <div>
      <h1>{num}</h1>
      <button onClick={syncClick}>+1</button>
      <button onClick={asyncClick}>+1 after 3s</button>
    </div>
  );
}

ReactDOM.render(<SyncAndAsyncCounter />, document.getElementById("root"));
