import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React, { useState } from "react";
// import ReactDOM from "react-dom";

class Counter1 extends React.PureComponent {
  render() {
    console.log("Counter1 render");
    return (
      <div>
        <h1>Counter1: {this.props.value}</h1>
        {/* <h1>Counter1: {this.props.value.value}</h1> */}
      </div>
    );
  }
}

class Counter2 extends React.PureComponent {
  render() {
    console.log("Counter2 render");
    return (
      <div>
        <h1>Counter2: {this.props.value}</h1>
        {/* <h1>Counter2: {this.props.value.value}</h1> */}
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    count1: 0,
    count2: 0,
  };
  render() {
    return (
      <div>
        <Counter1 value={this.state.count1}></Counter1>
        <Counter2 value={this.state.count2}></Counter2>
        <button
          onClick={() => {
            this.setState({
              count1: this.state.count1 + 1,
            });
          }}
        >
          Counter1+
        </button>
        <button
          onClick={() => {
            this.setState({
              count2: this.state.count2 + 1,
            });
          }}
        >
          Counter2+
        </button>
      </div>
    );
  }
}

// class App extends React.Component {
//   state = {
//     count1: { value: 0 },
//     count2: { value: 0 },
//   };
//   render() {
//     return (
//       <div>
//         <Counter1 value={this.state.count1}></Counter1>
//         <Counter2 value={this.state.count2}></Counter2>
//         <button
//           onClick={() => {
//             // const count1 = this.state.count1;
//             // count1.value = count1.value + 1;
//             // this.setState({
//             //   count1,
//             // });
//             this.setState({
//               count1: {
//                 value: this.state.count1.value + 1,
//               },
//             });
//           }}
//         >
//           Counter1+
//         </button>
//         <button
//           onClick={() => {
//             // const count2 = this.state.count2;
//             // count2.value = count2.value + 1;
//             // this.setState({
//             //   count2,
//             // });

//             this.setState({
//               count2: {
//                 value: this.state.count2.value + 1,
//               },
//             });
//           }}
//         >
//           Counter2+
//         </button>
//       </div>
//     );
//   }
// }

ReactDOM.render(<App />, document.getElementById("root"));
