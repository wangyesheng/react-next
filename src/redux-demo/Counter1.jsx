import React, { useEffect, useState } from "react";
import { bindActionCreators } from "./redux";

import store from "./store";
import * as types from "./store/action-types";

const { add, minus } = bindActionCreators(
  {
    add: (payload) => {
      return {
        type: types.COUNTER1_ADD,
        payload,
      };
    },
    minus: () => ({
      type: types.COUNTER1_MINUS,
    }),
  },
  store.dispatch
);

export default function Counter(props) {
  const [count, setCount] = useState(store.getState().counter1.count);
  useEffect(() => {
    store.subscribe(() => {
      setCount(store.getState().counter1.count);
    });
  }, []);
  return (
    <div>
      <h1>{count}</h1>
      <button
        onClick={() => {
          add(5);
        }}
      >
        +
      </button>
      <button onClick={minus}>-</button>
    </div>
  );
}
