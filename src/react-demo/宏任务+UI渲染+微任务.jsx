// import React, { useState, useEffect, useCallback } from "./libs/react";
// import ReactDOM from "./libs/react-dom";

import React, { createRef } from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor() {
    super();
    this.appRef = createRef();
    setTimeout(() => {
      console.log("constructor", this.appRef);
    });
  }
  componentDidMount() {
    console.log("componentDidMount", this.appRef);
  }
  render() {
    return <div ref={this.appRef}>index</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
