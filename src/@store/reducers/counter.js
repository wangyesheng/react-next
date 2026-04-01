import { ADD, MINUS } from "../actions";

export default function counter(state = { count: 0 }, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        count: state.count + action.payload || 1,
      };
    case MINUS:
      return {
        ...state,
        count: state.count - action.payload || 1,
      };
    default:
      return state;
  }
}
