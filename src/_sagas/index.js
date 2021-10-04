import { fork, all } from 'redux-saga/effects';
import LoginSaga from './login';
import dbSaga from './db';
import filterSaga from './filter';
import actionSaga from './action';
import dashboardSaga from './dashboard';

function* mainSaga() {
  yield all([
    fork(LoginSaga),
    fork(dbSaga),
    fork(filterSaga),
    fork(actionSaga),
    fork(dashboardSaga)
  ]);
}

export default mainSaga;
