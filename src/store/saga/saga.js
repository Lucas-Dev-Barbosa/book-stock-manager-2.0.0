import { all } from "redux-saga/effects";
import loginSaga from "../modules/sagas";

export default function* rootSaga() {
  return yield all([loginSaga]);
}
