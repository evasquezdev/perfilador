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


function* getFilterTable() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getFilterTable,
      token
    );
    yield put(actions.getFilterOK({
      filters: response,
    }));
  } catch (error) {
    yield put(actions.getFilterKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo obtener los filtros',
    }));
  }
}
function* getFilterInfo() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getFilterInfo,
      token
    );
    yield put(actions.filterInfoOK({
      info: response,
    }));
    
  } catch (error) {
    //yield put(actions.filterInfo());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo obtener la cantidad total de Data disponible',
    }));
  }
}



function* getdata(action) {
  try {
    const {
      FilterForm,
      dbs
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getFilterData,
      token,
      FilterForm,
      dbs
    );
 
    yield put(actions.filterDataOK({
      data: response
    }));
  } catch (error) {
    for (let index = 0; index < 10; index++) {
      yield put(actions.filterData({
        FilterForm: action.payload.FilterForm,
        dbs: action.payload.dbs
      })); 
    }
    yield put(actions.filterDataKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo filtrar la informacion',
    }));
  }
}

function* changeFlag(action) {
  try {
    const {
      value,
      flag
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.changeFlag,
      token,
      value,
      flag
    );
 
    yield put(actions.changeFlagOK({
      data: response
    }));
    yield put(actions.getfilter())
  } catch (error) {
    yield put(actions.changeFlagKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo guardar los cambios',
    }));
  }
}

function* filterSaga() {
  yield takeLatest(
    types.GET_DEP_MUNI,
    getdeps,
  );
  yield takeLatest(
    types.GET_FILTER,
    getFilterTable,
  );
  yield takeLatest(
    types.GET_INFO,
    getFilterInfo,
  );
  yield takeLatest(
    types.FILTER_DATA,
    getdata
  );
  yield takeLatest(
    types.CHANGE_FLAG,
    changeFlag
  );
}

export default filterSaga;