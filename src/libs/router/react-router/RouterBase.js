import React, { Component } from "react";

import RouterContext from "./RouterContext";

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };

    this.unlistener = props.history.listen((location) => {
      this.setState({
        location,
      });
    });
  }

  render() {
    return (
      <RouterContext.Provider
        value={{
          location: this.state.location, // 传递给 Route 用来判断路由是否匹配
          history: this.props.history, // 传递给 Route 中的组件来跳转路径
        }}
      >
        {this.props.children}
      </RouterContext.Provider>
    );
  }

  componentWillUnmount() {
    this.unlistener && this.unlistener();
  }
}
