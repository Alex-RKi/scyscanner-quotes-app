import { createStore } from "redux";
import rootReducer from "./reducers";

const initialState = {
  usersList: [{ email: "test@test.com", pass: "qwerty78" }],
  isLoggedIn: false,
  favorits: 0,
};

const LOCAL_DB = "ticketAppStorage3";
const localData = localStorage.getItem(LOCAL_DB);

const persistedState =
  localData === null ? initialState : JSON.parse(localData);

const store = createStore(rootReducer, persistedState);
store.subscribe(() => {
  localStorage.setItem(LOCAL_DB, JSON.stringify(store.getState()));
});

export default store;
