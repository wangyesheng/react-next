import * as types from "../action-types";

function reducer(state = { count: 10 }, action) {
  switch (action.type) {
    case types.COUNTER1_ADD:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case types.COUNTER1_MINUS:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export default reducer;
