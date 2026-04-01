import { combineReducers } from "../../redux";
// import { combineReducers } from "redux";
import counter1 from "./counter1";
import counter2 from "./counter2";
import asyncCounter from "./asyncCounter";

const reducers = combineReducers({
  counter1,
  counter2,
  asyncCounter,
});

export default reducers;
