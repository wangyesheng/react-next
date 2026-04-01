export function thunk({ getState, dispatch }) {
  // next: 原始的 dispatch 函数
  return function (next) {
    return function (action) {
      // 改写后的 dispatch 函数
      if (typeof action === "function") {
        return action({ getState, dispatch });
      }
      return next(action);
    };
  };
}
