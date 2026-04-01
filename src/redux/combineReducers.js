export function combineReducers(reducers) {
  return function (state = {}, action) {
    const nextState = {};
    for (const key in reducers) {
      const prevStateForKey = state[key];
      nextState[key] = reducers[key](prevStateForKey, action);
    }
    return nextState;
  };
}
