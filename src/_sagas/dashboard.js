import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import * as types from '../_types/dashboard';
import * as actions from '../_actions/dashboard';
import * as api from '../_apis/dashboard';
import * as reducers from '../_reducers';
import * as modalActions from '../_actions/modal';

function* getDashboard() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getDashboard,
      token
    );
    yield put(actions.getDashboardOK({
      data: response.data,
      actual_month_data: response.actual_month_data
    }));
  } catch (error) {
    yield put(actions.getDashboardKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo obtener informacion del dashboard',
    }));
  }
}

function* dashboardSaga() {
  yield takeLatest(
    types.GET_DASHBOARD,
    getDashboard,
  );
}

export default dashboardSaga;