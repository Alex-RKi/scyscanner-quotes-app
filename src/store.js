import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import { fetchWatcher } from "./saga/fetchSaga";
const sagaMiddleware = createSagaMiddleware();

const initialState = {
  usersList: [{ email: "test@test.com", pass: "qwerty78" }],
  isLoggedIn: false,
  favorits: 0,
};

const LOCAL_DB = "ticketAppStorage5";
const localData = localStorage.getItem(LOCAL_DB);

const persistedState =
  localData === null ? initialState : JSON.parse(localData);

const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(fetchWatcher);

store.subscribe(() => {
  localStorage.setItem(LOCAL_DB, JSON.stringify(store.getState()));
});

export default store;
