import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import rootReducers from "./reducers/rootReducers";

const store = createStore(
  combineReducers(rootReducers),
  applyMiddleware(thunk)
);

export default store;
