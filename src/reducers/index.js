import { combineReducers } from "redux";
import logStatusReducer from "./log-status-reducer";
import usersReducer from "./users-reducer";

const rootReducer = combineReducers({
  usersList: usersReducer,
  isLoggedIn: logStatusReducer,
});
export default rootReducer;
