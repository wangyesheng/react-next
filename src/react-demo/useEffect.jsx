// import React, { useEffect, useState } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function App() {
  const [num, setNum] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 此时定时器内部的 num 值永远为 0，因为闭包
      // 当 useEffect 依赖项是空数组的时候回调函数只会执行一次，此时 setInterval 内部的回调函数引用了外部的自由变量 num 形成了闭包，且 num 永远为 0
      setNum(num + 1);
    }, 1000);
    // const intervalId = setInterval(() => {
    //   setNum((n) => n + 1);
    // }, 1000);
  }, []);
  return (
    <div>
      <h1>{num}</h1>
    </div>
  );
}

function App1() {
  const [num, setNum] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 此时定时器内部的 num 值永远为最新值
      // 当 useEffect 依赖项不传的时候回调函数在每次重新 render 的时候都会重新执行，且每次重新执行的时候，如果上一次有返回销毁函数的话，会先执行销毁函数
      // 销毁函数内部做了清理定时器的操作，此时 setInterval 也会重新执行内部的回调函数，num 重新取值，自然是最新的
      setNum(num + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  });
  return (
    <div>
      <h1>{num}</h1>
    </div>
  );
}

function App2() {
  const [num, setNum] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // 此时定时器内部的 num 值永远为最新值
      // 当 useEffect 传入了依赖项数组的时候，当依赖项数组发生改变的时候会重新执行回调函数，且每次重新执行的时候，如果上一次有返回销毁函数的话，会先执行销毁函数
      // 销毁函数内部做了清理定时器的操作，此时 setInterval 也会重新执行内部的回调函数，num 重新取值，自然是最新的
      setNum(num + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [num]);
  return (
    <div>
      <h1>{num}</h1>
    </div>
  );
}

ReactDOM.render(<App2 />, document.getElementById("root"));
