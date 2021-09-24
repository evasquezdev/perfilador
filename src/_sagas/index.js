import { fork, all } from 'redux-saga/effects';
import LoginSaga from './login';
import dbSaga from './db';
import filterSaga from './filter';

function* mainSaga() {
  yield all([
    fork(LoginSaga),
    fork(dbSaga),
    fork(filterSaga)
  ]);
}

export default mainSaga;
