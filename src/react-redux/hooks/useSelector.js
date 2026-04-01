import { useContext, useEffect, useReducer, useRef } from "react";
import { ReactReduxContext } from "../ReactReduxContext";
import shallowEqual from "../utils/shallowEqual";

export default function useSelector(selector, equalityFn = shallowEqual) {
  const { store } = useContext(ReactReduxContext);
  const lastestState = useRef(selector(store.getState()));
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    return store.subscribe(() => {
      const state = selector(store.getState());
      if (!equalityFn(lastestState.current, state)) {
        lastestState.current = state;
        forceUpdate();
      }
    });
  }, [store, selector, equalityFn]);

  return lastestState.current;
}
