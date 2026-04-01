import * as types from "../action-types";

function reducer(state = { count: 50 }, action) {
  switch (action.type) {
    case types.ASYNC_ADD:
      return {
        ...state,
        count: state.count + action.payload,
      };
    case types.ASYNC_MINUS:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}

export default reducer;
