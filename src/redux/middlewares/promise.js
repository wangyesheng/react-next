export function promise({ getState, dispatch }) {
  // next: 原始的 dispatch 函数
  return function (next) {
    return function (action) {
      // 改写后的 dispatch 函数
      if (action.then && typeof action.then === "function") {
        return action.then((newAction) => {
          dispatch(newAction);
        });
      }
      return next(action);
    };
  };
}
