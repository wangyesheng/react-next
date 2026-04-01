// import React, { useEffect, useState } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, {
  useEffect,
  useState,
  useRef,
  Component,
  useLayoutEffect,
  forwardRef,
  createRef,
} from "react";
import ReactDOM from "react-dom";

class ClassComp extends Component {
  classRef = createRef();
  render() {
    return <div ref={this.classRef}>ClassComp</div>;
  }
}

function FunComp(props, ref) {
  return <div ref={ref}>FunComp</div>;
}

const ForwardFunComp = forwardRef(FunComp);

function App() {
  const divRef = useRef();
  const classCompRef = useRef();
  const funCompRef = useRef();
  // useEffect 浏览器渲染绘制后执行
  // useEffect(() => {
  //   console.log(divRef);
  //   console.log(classCompRef.current.classRef);
  //   const classRef = classCompRef.current.classRef.current;
  //   classRef.style.color = "#1890ff";
  //   classRef.style.width = "100px";
  //   classRef.style.height = "100px";
  //   classRef.style.background = "#d7ebff";
  //   classRef.style.transform = "translateX(200px) rotate(50deg)";
  //   classRef.style.transition = "all 500ms";
  // }, []);

  // useLayoutEffect 浏览器渲染绘制前执行
  // useLayoutEffect(() => {
  //   console.log(divRef);
  //   console.log(classCompRef.current.classRef);
  //   const classRef = classCompRef.current.classRef.current;
  //   classRef.style.color = "#1890ff";
  //   classRef.style.width = "100px";
  //   classRef.style.height = "100px";
  //   classRef.style.background = "#d7ebff";
  //   classRef.style.transform = "translateX(200px) rotate(50deg)";
  //   classRef.style.transition = "all 500ms";
  // }, []);

  useEffect(() => {
    console.log(funCompRef);
  });
  return (
    <div ref={divRef}>
      <h1>App</h1>
      <ClassComp ref={classCompRef} />
      <ForwardFunComp ref={funCompRef} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
