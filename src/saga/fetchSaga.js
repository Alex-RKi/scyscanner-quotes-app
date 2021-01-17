import { put, takeEvery, call } from "redux-saga/effects";
import { saveData } from "../actions";
import { getData } from "../API.data";

function* fetchWorker({ payload: url }) {
  const data = yield getData(url);
  const json = yield call(() => new Promise((res) => res(data.json())));
  yield put(saveData(json));
}

export function* fetchWatcher() {
  yield takeEvery("DATA_LOADING", fetchWorker);
}
