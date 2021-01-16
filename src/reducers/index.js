import { combineReducers } from "redux";
import favoritsRedicer from "./favoritsReducer";
import logStatusReducer from "./log-status-reducer";
import usersReducer from "./users-reducer";

const rootReducer = combineReducers({
  usersList: usersReducer,
  isLoggedIn: logStatusReducer,
  favorits: favoritsRedicer,
});
export default rootReducer;
