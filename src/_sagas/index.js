import { fork, all } from 'redux-saga/effects';
import LoginSaga from './login';
import dbSaga from './db';
import filterSaga from './filter';
import actionSaga from './action';

function* mainSaga() {
  yield all([
    fork(LoginSaga),
    fork(dbSaga),
    fork(filterSaga),
    fork(actionSaga),
  ]);
}

export default mainSaga;
