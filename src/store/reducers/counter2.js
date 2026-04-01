import * as types from "../action-types";

function reducer(state = { count: 100 }, action) {
  switch (action.type) {
    case types.COUNTER2_ADD:
      return {
        ...state,
        count: state.count + action.payload || 1,
      };
    case types.COUNTER2_MINUS:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export default reducer;
