import { fork, all } from 'redux-saga/effects';
import LoginSaga from './login';
import dbSaga from './db';
import filterSaga from './filter';
import actionSaga from './action';
import dashboardSaga from './dashboard';
import companySaga from './company';
import userSaga from './user'
import CampaingSaga from './campaing';

function* mainSaga() {
  yield all([
    fork(LoginSaga),
    fork(dbSaga),
    fork(filterSaga),
    fork(actionSaga),
    fork(dashboardSaga),
    fork(companySaga),
    fork(userSaga),
    fork(CampaingSaga)
  ]);
}

export default mainSaga;
