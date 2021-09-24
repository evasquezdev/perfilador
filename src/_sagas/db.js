import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import * as types from '../_types/db';
import * as actions from '../_actions/db';
import * as api from '../_apis/db';
import * as reducers from '../_reducers';
import * as modalActions from '../_actions/modal';

function* getdb() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.getdbs,
      token
    );
    yield put(actions.getDbsOK({
      dbs: response
    }));
  } catch (error) {
    yield put(actions.getDbsKO());
  }
}

function* postdb(action) {
  try {
    const {
      name,
      file,
      abbreviation
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.postdb,
      token,
      file,
      name,
      abbreviation
    );
    yield put(actions.postDbOK({
      db: response
    }));
    yield put(actions.getDbs())
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "DB creada"
    }));
  } catch (error) {
    yield put(actions.postDbKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'Please try again',
    }));
  }
}

function* syncdb(action){
  try{
    const {
      database,
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.syncdb,
      token,
      database,
    );
    yield put(actions.syncDbOK({
      response
    }));
    yield put(actions.getDbs())
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: response.message
    }));
  }catch(error){
    yield put(actions.syncDbKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo sincronizar la DB',
    }));
  }
}

function* deletedb(action){
  try{
    const {
      database,
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.deletedb,
      token,
      database,
    );
    yield put(actions.deleteDbOK({
      response
    }));
    yield put(actions.getDbs())
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: response.message
    }));
  }catch(error){
    yield put(actions.deleteDbKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo eliminar la DB',
    }));
  }
}

function* dbSaga() {
  yield takeLatest(
    types.GET_DBS,
    getdb,
  );
  yield takeLatest(
    types.POST_DB,
    postdb
  );
  yield takeLatest(
    types.POST_SYNC_DB,
    syncdb
  );
  yield takeLatest(
    types.POST_DELETE_DB,
    deletedb
  )
}

export default dbSaga;