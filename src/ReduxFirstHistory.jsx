import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, minus } from "./@store/actions";
import { bindActionCreators } from "redux";

function ReduxFirstHistory() {
  const state = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const { add: addCallback, minus: minusCallback } = bindActionCreators(
    { add, minus },
    dispatch
  );
  return (
    <div>
      <h1>ReduxFirstHistory</h1>
      <h3>{state.count}</h3>
      <button onClick={() => addCallback(10)}>+</button>
      <button onClick={() => minusCallback(5)}>-</button>
    </div>
  );
}

export default ReduxFirstHistory;
