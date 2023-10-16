import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

// class App extends React.Component {
//   state = {
//     num: 0,
//   };

//   render() {
//     return (
//       <div>
//         <h1>{this.state.num}</h1>
//         <button
//           onClick={() => {
//             // this.setState(
//             //   (prevState, prevProps) => {
//             //     return {
//             //       num: prevState.num + 1,
//             //     };
//             //   },
//             //   () => {
//             //     console.log(this.state);
//             //   }
//             // );
//             // this.setState(
//             //   (prevState, prevProps) => {
//             //     return {
//             //       num: prevState.num + 1,
//             //     };
//             //   },
//             //   () => {
//             //     console.log(this.state);
//             //   }
//             // );
//             this.setState(
//               {
//                 num: this.state.num + 1,
//               },
//               () => {
//                 console.log(this.state);
//               }
//             );
//             this.setState(
//               {
//                 num: this.state.num + 1,
//               },
//               () => {
//                 console.log(this.state);
//               }
//             );
//             this.setState(
//               {
//                 num: this.state.num + 1,
//               },
//               () => {
//                 console.log(this.state);
//               }
//             );
//           }}
//         >
//           Click
//         </button>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  onMouseMove = (e) => {
    const { clientY, clientX } = e;
    this.setState({
      clientX,
      clientY,
    });
  };
  state = {
    clientX: 0,
    clientY: 0,
  };
  render() {
    return (
      <div onMouseMove={this.onMouseMove}>
        {/* <h1>Mouse point</h1>
        <h3>clientX: {this.state.clientX}</h3>
        <h3>clientY: {this.state.clientY}</h3> */}

        {/* {this.props.children(this.state)} */}

        {this.props.render(this.state)}
      </div>
    );
  }
}

// ReactDOM.render(
//   <App>
//     {/* 函数作为子组件 */}
//     {(props) => (
//       <div>
//         <h1>Mouse point</h1>
//         <h3>clientX: {props.clientX}</h3>
//         <h3>clientY: {props.clientY}</h3>
//       </div>
//     )}
//   </App>,
//   document.getElementById("root")
// );

ReactDOM.render(
  <App
    render={(props) => (
      <div>
        <h1>Mouse point</h1>
        <h3>clientX: {props.clientX}</h3>
        <h3>clientY: {props.clientY}</h3>
      </div>
    )}
  />,
  document.getElementById("root")
);
