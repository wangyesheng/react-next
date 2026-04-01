import React from "react";
import { counter1 as counter1ActionCreator } from "./store/action-creators";
import { useDispatch, useSelector } from "./react-redux";
import { ASYNC_ADD, COUNTER1_ADD, COUNTER1_MINUS } from "./store/action-types";

function Counter() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.counter1);
  const asyncState = useSelector((state) => state.asyncCounter);
  return (
    <div>
      <h1>Count: {state.count}</h1>
      <h1>Aysnc Count: {asyncState.count}</h1>
      <button onClick={() => dispatch(counter1ActionCreator.add(5))}>+</button>
      <button onClick={() => dispatch(counter1ActionCreator.minus())}>-</button>
      <button
        onClick={() =>
          dispatch({
            type: COUNTER1_ADD,
            payload: 0,
          })
        }
      >
        dispatch +
      </button>
      <button
        onClick={() =>
          dispatch({
            type: COUNTER1_MINUS,
            payload: 10,
          })
        }
      >
        dispatch -
      </button>
      <button
        onClick={() => {
          dispatch(function ({ dispatch }) {
            setTimeout(() => {
              dispatch({
                type: ASYNC_ADD,
                payload: 5,
              });
            }, 1000);
          });
        }}
      >
        thunk +
      </button>
    </div>
  );
}

export default Counter;
