import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import taskReducer from "./task-reducers";
import loggerMiddleware from "./custom-middleware";

const rootReducer = combineReducers({
  taskReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(loggerMiddleware)),
);

export default store;
