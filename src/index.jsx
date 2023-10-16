// import React, { useState, useEffect, useCallback } from "./libs/react";
// import ReactDOM, { useRef } from "./libs/react-dom";

import React from "react";
import ReactDOM from "react-dom";
// import { HashRouter as Rouetr, Route } from "react-router-dom";
import { HashRouter as Router, Route } from "./libs/router/react-router-dom";

function Home(props) {
  console.log("Home", props);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => props.history.push("/me", { from: "home" })}>
        to me
      </button>
    </div>
  );
}

class Me extends React.Component {
  render() {
    console.log("Me", this.props);
    return (
      <div>
        <h2>Me</h2>
        <button onClick={() => this.props.history.push("/profile")}>
          to profile
        </button>
      </div>
    );
  }
}

function Profile(props) {
  console.log("Profile", props);
  return (
    <div>
      <h3>Profile</h3>
      <button onClick={() => props.history.push("/")}>back home</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/me" component={Me} />
      <Route path="/profile" component={Profile} />
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
