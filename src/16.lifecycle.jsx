// const el1 = (
//   <h1
//     id="hello"
//     className="hello--"
//     style={{ background: "#ccc", height: "auto" }}
//   >
//     <span style={{ color: "#ee0000", marginRight: "10px" }}>hello</span>
//     world
//   </h1>
// );

// jsx 是语法糖，通过 babel 进行转义成下面的语法
// const el2 = React.createElement(
//   "h1",
//   {
//     id: "world",
//   },
//   "hello",
//   "world"
// );

// console.log(el2);

// const el3 = React.createElement(
//   "h1",
//   {
//     id: "hel",
//   },
//   ["h", "e", "l"]
// );

// function ChildWelcome(props) {
//   return (
//     <div>
//       Welcome
//       <span style={{ marginLeft: "10px" }}>{props.name}</span>
//     </div>
//   );
// }

// function Welcome(props) {
//   return <ChildWelcome {...props} />;
// }

/**------------------------------ 合成事件 & 批量更新 --------------------------------- */

// class Counter extends React.Component {
//   state = {
//     num: 0,
//   };

//   handleClick = (e) => {
//     console.log(e);
//     /**
//      * 合成事件与批量更新
//      * 在 React 里，事件的更新可能是异步的、批量的，不是同步的
//      *  - 调用setState之后状态没有立刻更新，而是先缓存起来，等事件函数处理完成后，在进行批量更新
//      *  - 因为 jsx 处理函数是 React 控制的，只要 setState 归 React 控制（事件处理函数、生命周期函数）就是批量，不归 React 控制（setTimeout | queueMicrotask | Promise）就是非批量（同步更新）
//      */
//     this.setState({
//       num: this.state.num + 1,
//     });
//     console.log(this.state.num);
//     this.setState({
//       num: this.state.num + 1,
//     });
//     console.log(this.state.num);
//     setTimeout(() => {
//       this.setState({
//         num: this.state.num + 1,
//       });
//       console.log(this.state.num);
//       this.setState({
//         num: this.state.num + 1,
//       });
//       console.log(this.state.num);
//     }, 0);

//     // queueMicrotask(() => {
//     //   this.setState({
//     //     num: this.state.num + 1,
//     //   });
//     //   console.log(this.state.num);
//     //   this.setState({
//     //     num: this.state.num + 1,
//     //   });
//     //   console.log(this.state.num);
//     // });

//     // Promise.resolve().then(() => {
//     //   this.setState({
//     //     num: this.state.num + 1,
//     //   });
//     //   console.log(this.state.num);
//     //   this.setState({
//     //     num: this.state.num + 1,
//     //   });
//     //   console.log(this.state.num);
//     // });
//   };

//   componentDidMount() {
//     // this.setState({
//     //   num: this.state.num + 1,
//     // });
//     // console.log(this.state.num);
//     // this.setState({
//     //   num: this.state.num + 1,
//     // });
//     // console.log(this.state.num);
//     // queueMicrotask(() => {
//     //   this.setState({
//     //     num: this.state.num + 1,
//     //   });
//     //   console.log(this.state.num);
//     //   this.setState({
//     //     num: this.state.num + 1,
//     //   });
//     //   console.log(this.state.num);
//     // });
//   }

//   onIncrement = () => {
//     this.setState(
//       (prevState, props) => {
//         console.log("prevState", prevState);
//         return {
//           num: prevState.num + 1,
//         };
//       },
//       () => {
//         console.log("cb", this.state.num);
//       }
//     );
//     console.log(this.state.num);
//     this.setState(
//       (prevState, props) => {
//         console.log("prevState", prevState);
//         return {
//           num: prevState.num + 1,
//         };
//       },
//       () => {
//         console.log("cb", this.state.num);
//       }
//     );
//     console.log(this.state.num);
//     queueMicrotask(() => {
//       this.setState(
//         (prevState, props) => ({
//           num: prevState.num + 1,
//         }),
//         () => {
//           console.log("queueMicrotask.cb", this.state.num);
//         }
//       );
//       console.log(this.state.num);
//       this.setState(
//         (prevState, props) => ({
//           num: prevState.num + 1,
//         }),
//         () => {
//           console.log("queueMicrotask.cb", this.state.num);
//         }
//       );
//       console.log(this.state.num);
//     });
//   };

//   onIncrement1 = () => {
//     this.setState(
//       {
//         num: this.state.num + 1,
//       },
//       () => {
//         console.log("cb", this.state.num);
//       }
//     );
//     console.log(this.state.num);
//     this.setState(
//       {
//         num: this.state.num + 1,
//       },
//       () => {
//         console.log("cb", this.state.num);
//       }
//     );
//     console.log(this.state.num);
//     queueMicrotask(() => {
//       this.setState(
//         (prevState, props) => ({
//           num: prevState.num + 1,
//         }),
//         () => {
//           console.log("cb", this.state.num);
//         }
//       );
//       console.log("queueMicrotask", this.state.num);
//       this.setState(
//         (prevState, props) => ({
//           num: prevState.num + 1,
//         }),
//         () => {
//           console.log("cb", this.state.num);
//         }
//       );
//       console.log("queueMicrotask", this.state.num);
//     });
//   };

//   onTestCalc = () => {
//     this.setState(
//       function (prevState, props) {
//         return {
//           num: prevState.num + 1,
//         };
//       },
//       () => {
//         console.log(this.state);
//       }
//     );
//     console.log("sync", this.state);
//     this.setState(
//       {
//         num: this.state.num + 1,
//       },
//       () => {
//         console.log(this.state);
//       }
//     );
//     console.log("sync", this.state);
//   };

//   render() {
//     const { num } = this.state;
//     const { name } = this.props;
//     return (
//       <div>
//         <p>{name}</p>
//         <p>{num}</p>
//         <button style={{ display: "block" }} onClick={this.handleClick}>
//           ＋
//         </button>
//         <button style={{ display: "block" }} onClick={this.onIncrement}>
//           ＋
//         </button>
//         <button style={{ display: "block" }} onClick={this.onIncrement1}>
//           ＋
//         </button>
//         <button style={{ display: "block" }} onClick={this.onTestCalc}>
//           Test
//         </button>
//       </div>
//     );
//   }
// }

// class ChildCounter extends React.Component {
//   state = {
//     num: 0,
//   };

//   onIncrement = (e) => {
//     console.log(e);
//     this.setState(
//       {
//         num: this.state.num + 1,
//       },
//       () => {
//         console.log("cb", this.state.num);
//       }
//     );
//     this.setState(
//       {
//         num: this.state.num + 1,
//       },
//       () => {
//         console.log("cb", this.state.num);
//       }
//     );
//   };

//   onSpanIncrement = (e) => {
//     console.log("onSpanIncrement", e);
//     e.stopPropagation();
//   };

//   render() {
//     return (
//       <div style={{ border: "2px solid #1890ff" }}>
//         <p>{this.state.num}</p>
//         <button style={{ display: "block" }} onClick={this.onIncrement}>
//           <span onClick={this.onSpanIncrement}>＋</span>
//         </button>
//       </div>
//     );
//   }
// }

/**------------------------------ 生命周期 --------------------------------- */

import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
    console.log("1.Counter - constructor");
  }

  componentWillMount(...args) {
    console.log("2.Counter - componentWillMount", args);
  }

  render(...args) {
    console.log("3.Counter - render", args);
    return (
      <div
        id={`counter-${this.state.number}`}
        style={{ border: "1px solid #1890ff", padding: "20px" }}
      >
        <h2>
          {this.props.name}: {this.state.number}
        </h2>
        {/* {this.state.number == 2 ? (
          <FunctionCounter count={this.state.number} />
        ) : null} */}
        <button
          onClick={() => {
            this.setState(
              {
                number: this.state.number + 1,
              }
              // () => {
              //   console.log("cb", this.state);
              // }
            );

            // console.log("sync", this.state);
          }}
        >
          Increment
        </button>
        {/* {this.state.number == 4 ? (
          <FunctionCounter count={this.state.number} />
        ) : null}
        {this.state.number % 2 === 0 ? (
          <SubCounter count={this.state.number} />
        ) : (
          <ChildCounter count={this.state.number} />
        )}
        <div style={{ border: "1px solid #40ff18", padding: "20px" }}>
          footer
        </div> */}
      </div>
    );
  }

  componentDidMount(...args) {
    console.log("4.Counter - componentDidMount", args);
  }

  shouldComponentUpdate(props, state) {
    console.log(
      "5.Counter - shouldComponentUpdate",
      props,
      state,
      this.state,
      this.props
    );
    return state.number > 2;
  }

  componentWillUpdate(props, state) {
    console.log(
      "6.Counter - componentWillUpdate",
      props,
      state,
      this.state,
      this.props
    );
  }

  componentDidUpdate(...args) {
    console.log("7.Counter - componentDidUpdate", args, this.state);
  }
}

function FunctionCounter(props) {
  return <h1 style={{ color: "#c513e6" }}>{props.count}</h1>;
}

class SubCounter extends React.Component {
  render() {
    return <h1>{this.props.count}</h1>;
  }

  componentWillUnmount() {
    console.log("SubCounter-componentWillUnmount");
  }
}

class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 10,
    };
    console.log("1.ChildCounter - constructor");
  }

  componentWillMount(...args) {
    console.log("2.ChildCounter - componentWillMount", args);
  }

  render(...args) {
    console.log("3.ChildCounter - render", args);
    return (
      <div style={{ border: "1px solid #ff0000", padding: "20px" }}>
        <h2>
          {this.props.count}: {this.state.number}
        </h2>
        <button
          onClick={() => {
            this.setState({
              number: this.state.number + 10,
            });
          }}
        >
          Increment
        </button>
      </div>
    );
  }

  componentDidMount(...args) {
    console.log("4.ChildCounter - componentDidMount", args);
  }

  componentWillReceiveProps(...args) {
    console.log("5.ChildCounter - componentWillReceiveProps", args);
  }

  shouldComponentUpdate(props, state) {
    console.log("6.ChildCounter - shouldComponentUpdate", props, state);
    return true;
  }

  componentWillUpdate(...args) {
    console.log("7.ChildCounter - componentWillUpdate", args);
  }

  componentDidUpdate(...args) {
    console.log("8.ChildCounter - componentDidUpdate", args);
  }

  componentWillUnmount(...args) {
    console.log("9.ChildCounter - componentWillUnmount", args);
  }
}

class App extends React.Component {
  state = {
    number: 100,
  };
  render() {
    return <Counter />;
  }
}

ReactDOM.render(
  <Counter name="APP-COUNTER" />,
  document.getElementById("root")
);
