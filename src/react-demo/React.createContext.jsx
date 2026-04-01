import React from "./libs/react";
import ReactDOM from "./libs/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

const MoneyContext = React.createContext();

class Parent extends React.Component {
  state = {
    money: 1000,
  };

  changeMoney = (value) => {
    this.setState({
      money: this.state.money - value,
    });
  };

  render() {
    return (
      <MoneyContext.Provider
        value={{
          money: this.state.money,
          changeMoney: this.changeMoney,
        }}
      >
        <div style={{ border: "1px solid #ff0000", padding: "20px" }}>
          <h1>Parent</h1>
          <h2>total: {this.state.money}</h2>
          <Child />
        </div>
      </MoneyContext.Provider>
    );
  }
}

class Child extends React.Component {
  static contextType = MoneyContext;
  render() {
    return (
      <div style={{ border: "1px solid #1890ff", padding: "20px" }}>
        <h1>Child</h1>
        <h3>total: {this.context.money}</h3>
        <button
          onClick={() => {
            this.context.changeMoney(50);
          }}
        >
          Use money
        </button>
        <Grandson />
        <Grandson1 />
      </div>
    );
  }
}

class Grandson extends React.Component {
  static contextType = MoneyContext;
  render() {
    return (
      <div style={{ border: "1px solid #d5d434", padding: "20px" }}>
        <h1>Grandson</h1>
        <h3>total: {this.context.money}</h3>
        <button
          onClick={() => {
            this.context.changeMoney(10);
          }}
        >
          Use money
        </button>
      </div>
    );
  }
}

function Grandson1() {
  return (
    <MoneyContext.Consumer>
      {(value) => {
        return (
          <div style={{ border: "1px solid #6718ff", padding: "20px" }}>
            <h1>Grandson1</h1>
            <h3>total: {value.money}</h3>
            <button
              onClick={() => {
                value.changeMoney(100);
              }}
            >
              Use money
            </button>
          </div>
        );
      }}
    </MoneyContext.Consumer>
  );
}
ReactDOM.render(<Parent />, document.getElementById("root"));
