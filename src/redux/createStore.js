function isPlainObject(obj) {
  return Object.getPrototypeOf(obj) === Object.prototype;
}

export function createStore(reducer, preloadState) {
  let state = preloadState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    console.log("dispatch", action);
    if (!isPlainObject(action)) {
      throw new Error(
        `Actions must be plain objects. Instead, the actual type was: '${typeof action}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions.`
      );
    }
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }

  // 默认初始化 state 数据
  dispatch({ type: "@@REDUX/INIT" });

  return {
    getState,
    dispatch,
    subscribe,
    listeners,
  };
}
