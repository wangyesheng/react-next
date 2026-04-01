export function applyMiddleware(...middlewares) {
  return function (createStore) {
    return function (reducer) {
      const store = createStore(reducer);
      let dispatch;
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (action) => dispatch(action),
      };

      // 中间件核心：改写 store 的 dispatch 方法
      // dispatch = middlewares(middlewareAPI)(store.dispatch);
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(chain)(store.dispatch);

      return {
        ...store,
        dispatch,
      };
    };
  };
}

// function compose(fns) {
//   // 从右往左组装，从左往右执行
//   // [promise,thunk,looger]
//   // promise(thunk(logger(store.dispatch)))
//   return (args) => {
//     return fns.reduceRight((memo, current) => current(memo), args);
//   };
// }

const compose = (fns) => (args) =>
  fns.reduceRight((memo, current) => current(memo), args);
