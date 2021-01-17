import { combineReducers } from "redux";
import favoritsReducer from "./favorits-reducer";
import fetchReducer from "./fetch-reducer";
import logStatusReducer from "./log-status-reducer";
import usersReducer from "./users-reducer";

const rootReducer = combineReducers({
  usersList: usersReducer,
  isLoggedIn: logStatusReducer,
  favorits: favoritsReducer,
  flights: fetchReducer,
});
export default rootReducer;
