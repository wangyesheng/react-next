import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

class Counter extends React.Component {
  state = {
    nums: [],
  };
  counterRef = React.createRef();
  render() {
    return (
      <div ref={this.counterRef} style={{ border: "1px solid #1890ff" }}>
        <SubCounter counterRef={this.counterRef} />
      </div>
    );
  }
}

class SubCounter extends React.Component {
  render() {
    return (
      <div>
        <h1>SubCounter</h1>
        <button
          onClick={() => {
            const { counterRef } = this.props;
            console.log(counterRef);
          }}
        >
          Click
        </button>
      </div>
    );
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));
