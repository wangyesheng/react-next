export function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
  }
  return boundActionCreators;
}

function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    console.log(args, actionCreator);
    // 先执行 actionCreator 再执行 dispatch
    const action = actionCreator(...args);
    dispatch(action);
  };
}
