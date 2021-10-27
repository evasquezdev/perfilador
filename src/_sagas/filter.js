import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import * as types from '../_types/filter';
import * as actions from '../_actions/filter';
import * as api from '../_apis/filter';
import * as reducers from '../_reducers';
import * as modalActions from '../_actions/modal';

function* getdeps() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getDepts,
      token
    );
    yield put(actions.getDepsOK({
      deparments: response.deparments,
      municipalities: response.municipalities
    }));
  } catch (error) {
    yield put(actions.getDepsKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo obtener departamentos y municipalidades',
    }));
  }
}

function* getdata(action) {
  try {
    const {
      age_end,
      age_init,
      departmentid,
      departmentlabel,
      file,
      header,
      municipality,
      range,
      sex,
      sms_email,
      text
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getFilterData,
      token,
      age_end,
      age_init,
      departmentid,
      departmentlabel,
      file,
      header,
      municipality,
      range,
      sex,
      sms_email,
      text
    );
    console.log('aqui', age_init,
      age_end,
      departmentid,
      departmentlabel,
      municipality,
      range,
      sex,
      sms_email)
    yield put(actions.filterDataOK({
      data: response
    }));
  } catch (error) {
    yield put(actions.filterDataKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo filtrar la informacion',
    }));
  }
}

function* filterSaga() {
  yield takeLatest(
    types.GET_DEP_MUNI,
    getdeps,
  );
  yield takeLatest(
    types.FILTER_DATA,
    getdata
  )
}

export default filterSaga;