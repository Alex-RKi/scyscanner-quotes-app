import { createStore } from "redux";
import rootReducer from "./reducers";

const initialState = {
  usersList: [{ email: "test@test.com", pass: "qwerty78" }],
  isLoggedIn: false,
};

const localData = localStorage.getItem("ticketAppStorage2");

const persistedState =
  localData === null ? initialState : JSON.parse(localData);

const store = createStore(rootReducer, persistedState);
store.subscribe(() => {
  localStorage.setItem("ticketAppStorage2", JSON.stringify(store.getState()));
});

export default store;
