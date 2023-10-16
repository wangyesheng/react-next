// import React from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  state = {
    number: 0,
  };

  componentWillReceiveProps(...args) {
    console.log(args);
  }

  render() {
    return (
      <div style={{ border: "1px solid #1890ff" }}>
        <h2>{this.state.number}</h2>
        <button
          onClick={() => {
            this.setState({
              number: this.state.number + 1,
            });
          }}
        >
          Click
        </button>
        <SubCounter number={this.state.number} />
      </div>
    );
  }
}

class SubCounter extends React.Component {
  state = {
    count: 0,
  };

  clientX = 0;

  render() {
    console.log("render");
    return (
      <div style={{ border: "1px solid #ff0000" }}>
        <h2>props: {this.props.number}</h2>
        <h2>state: {this.state.count}</h2>
        <h2>clientX: {this.clientX}</h2>
      </div>
    );
  }

  componentWillReceiveProps(...args) {
    console.log(args);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps, prevState);
    if (nextProps.number === 0) {
      return { count: 10 };
    } else if (nextProps.number % 2 === 0) {
      return { count: nextProps.number * 2 };
    }
    return null; // 返回null代表不修改状态
  }

  componentDidMount() {
    // window.addEventListener("mousemove", (e) => {
    //   this.clientX = e.clientX;
    //   this.forceUpdate();
    // });
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));
