import { applyMiddleware, createStore } from "../redux";
import { thunk, promise } from "../redux/middlewares";
// import { createStore } from "redux";
import reducers from "./reducers";

const store = applyMiddleware(thunk, promise)(createStore)(reducers);

export default store;
