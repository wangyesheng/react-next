import React, { Component } from "react";
import RouterContext from "./RouterContext";

export default class Route extends Component {
  static contextType = RouterContext;
  render() {
    const { exact, path, component: RouteComponent } = this.props;
    const { history, location } = this.context;
    const match = location.pathname === path;
    let renderElement = null;
    if (match) {
      const routeProps = {
        history,
        location,
        match,
      };
      renderElement = <RouteComponent {...routeProps} />;
    }
    return renderElement;
  }
}
