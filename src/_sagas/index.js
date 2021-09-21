import { fork, all } from 'redux-saga/effects';
import LoginSaga from './login';

function* mainSaga() {
  yield all([
    fork(LoginSaga),
  ]);
}

export default mainSaga;
