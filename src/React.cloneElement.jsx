// import React from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { useState } from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  state = {
    count: 0,
  };
  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child, i) => {
          return React.cloneElement(
            child,
            {
              key: i,
              onClick: () => {
                this.setState({
                  count: this.state.count + 1,
                });
              },
            },
            this.state.count
          );
        })}
      </div>
    );
  }
}

ReactDOM.render(
  <App>
    <h1>App</h1>
    <button>Click</button>
  </App>,
  document.getElementById("root")
);
