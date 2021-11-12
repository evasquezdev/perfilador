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
      deparments: response,
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
      FilterForm
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getFilterData,
      token,
      FilterForm
    );
 
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