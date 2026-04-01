import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React, { useState } from "react";
// import ReactDOM from "react-dom";

/**
 * 高阶组件优点：属性代理、反向继承
 */

function withAuth(Wrapper) {
  return class extends React.Component {
    render() {
      return <Wrapper {...this.props} withAuth="withAuth" />;
    }
  };
}

function withTimer(Wrapper) {
  return class extends React.Component {
    state = {
      time: 0,
    };

    componentDidMount() {
      setInterval(() => {
        this.setState({
          time: ++this.state.time,
        });
      }, 1000);
    }
    render() {
      return (
        <Wrapper {...this.props} withTimer="withTimer" time={this.state.time} />
      );
    }
  };
}

@withTimer
@withAuth
class App extends React.Component {
  render() {
    return (
      <div style={{ border: "1px solid #ff0000", padding: "20px" }}>
        <h1>{this.props.withAuth}</h1>
        <h1>{this.props.withTimer}</h1>
        <h2>total: {this.props.time}</h2>
      </div>
    );
  }
}

class Loading extends React.Component {
  show = () => {
    const loadingWrap = document.createElement("div");
    loadingWrap.innerHTML = `<p id="loading" style="position:absoulte;top:50%;left:50%;background:#000;color:#fff;padding:'20px">加载中...</p>`;
    document.body.appendChild(loadingWrap);
  };

  hide = () => {
    document.getElementById("loading").remove();
  };
}

// class AppLoading extends Loading {
//   render() {
//     return (
//       <div>
//         <h1>AppLoading</h1>
//         <button onClick={this.show}>show</button>
//         <button onClick={this.hide}>hide</button>
//       </div>
//     );
//   }
// }

const withLoading = (message) => (WrapperComponent) => {
  return class extends React.Component {
    show = () => {
      const loadingWrap = document.createElement("div");
      loadingWrap.id = "loading";
      loadingWrap.innerHTML = `<p style="position:absoulte;top:50%;left:50%;background:#000;color:#fff;padding:'20px">${message}</p>`;
      document.body.appendChild(loadingWrap);
    };

    hide = () => {
      document.body.removeChild(document.getElementById("loading"));
    };

    render() {
      return (
        <WrapperComponent {...this.props} show={this.show} hide={this.hide} />
      );
    }
  };
};

@withLoading("loading...")
class AppTest extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <button onClick={this.props.show}>show</button>
        <button onClick={this.props.hide}>hide</button>
      </div>
    );
  }
}

// const WrapperComponent = withLoading("loading...")(AppTest);

// 反向继承

class Button extends React.Component {
  render() {
    return <button>Click</button>;
  }
}

function withContent(WrapperComponent) {
  return class extends WrapperComponent {
    render() {
      const superRenderVDOM = super.render();
      const ClonedButton = React.cloneElement(superRenderVDOM, {}, "Click");
      return ClonedButton;
    }
  };
}

const WButton = withContent(Button);

ReactDOM.render(<AppTest />, document.getElementById("root"));
