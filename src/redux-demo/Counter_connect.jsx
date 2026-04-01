import React, { Component } from "react";
import { connect, connectFn } from "./react-redux";

import { bindActionCreators } from "./redux";
import {
  counter1 as counter1ActionCreator,
  counter2 as counter2ActionCreator,
} from "./store/action-creators";
import { COUNTER1_MINUS } from "./store/action-types";

// import { bindActionCreators } from "./redux";

// const { add, minus } = bindActionCreators(
//   {
//     add: (payload) => ({
//       type: types.COUNTER2_ADD,
//       payload,
//     }),
//     minus: () => ({
//       type: types.COUNTER2_MINUS,
//     }),
//   },
//   store.dispatch
// );

@connect(
  (state) => state.counter1,
  (dispatch) => bindActionCreators(counter1ActionCreator, dispatch)
)
class Counter1 extends Component {
  render() {
    return (
      <div>
        <h1>Counter: {this.props.count}</h1>
        <button onClick={() => this.props.add(5)}>+</button>
        <button onClick={() => this.props.minus()}>-</button>
      </div>
    );
  }
}

function Counter2(props) {
  return (
    <div>
      <h1>Counter: {props.count}</h1>
      <button onClick={() => props.add(5)}>+</button>
      <button onClick={() => props.minus()}>-</button>
      <button onClick={() => props.dispatch?.({ type: COUNTER1_MINUS })}>
        dispatch
      </button>
    </div>
  );
}

const mapStateToProps = (state) => state.counter2;
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(counter2ActionCreator, dispatch);

// mapDispatchToProps 可以传函数、actionCreator 对象；也可以不传，不传的话返回原生的 dispatch 函数
export default connectFn(mapStateToProps, mapDispatchToProps)(Counter2);
