import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import * as types from '../_types/campaing';
import * as actions from '../_actions/campaing';
import * as api from '../_apis/campaing';
import * as reducers from '../_reducers';
import * as modalActions from '../_actions/modal';
import action from '_reducers/action';

function* fetchCampaing() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.fetchCampaing,
      token,
    );
    yield put(actions.fetchCampaingOK({
      campaing: response
    }));
  } catch (error) {
    yield put(actions.fetchCampaingKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo cargar las campañas',
    }));
  }
}

function* fetchCampaingSMS() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.fetchCampaingSMS,
      token,
    );
    yield put(actions.fetchCampaingSMSOK({
      campaingSMS: response
    }));
  } catch (error) {
    yield put(actions.fetchCampaingSMSKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo cargar las campañas',
    }));
  }
}

function* GetCampaing(action) {
  try {
    const token = yield select(reducers.getUserToken);
    const {
      id
    } = action.payload;
    const response = yield call(
      api.getCampaing,
      token,
      id
    );
    yield put(actions.getCampaingOK({
      campaingData: response
    }));
  } catch (error) {
    yield put(actions.getCampaingKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo cargar los datos',
    }));
  }
}

function* GetCampaingSMS(action) {
  try {
    const token = yield select(reducers.getUserToken);
    const {
      id
    } = action.payload;
    const response = yield call(
      api.getCampaingSMS,
      token,
      id
    );
    yield put(actions.getCampaingSMSOK({
      campaingDataSMS: response
    }));
  } catch (error) {
    yield put(actions.getCampaingSMSKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo cargar los datos',
    }));
  }
}

function* GetCampaingSMSFILE(action) {
  try {
    const token = yield select(reducers.getUserToken);
    const {
      id
    } = action.payload;
    const response = yield call(
      api.getCampaingSMSFILE,
      token,
      id
    );
    yield put(
      actions.getCampaingSMSFILEOK({
      campaingDataSMSFILE: response,
      
    },
   
    ));
 
  } catch (error) {
    yield put(actions.getCampaingSMSFILEKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo descargar los datos',
    }));
  }
}

function* GetCampaingFILE(action) {
  try {
    const token = yield select(reducers.getUserToken);
    const {
      id
    } = action.payload;
    const response = yield call(
      api.getCampaingFILE,
      token,
      id
    );
    yield put(actions.getCampaingFILEOK({
      campaingDataFILE: response
    }));
  } catch (error) {
    yield put(actions.getCampaingFILEKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo descargar los datos',
    }));
  }
}

function* CampaingSaga() {
  yield takeLatest(
    types.FETCH_CAMPAING,
    fetchCampaing,
  );
  yield takeLatest(
    types.FETCH_CAMPAINGSMS,
    fetchCampaingSMS,
  );
  yield takeLatest(
    types.GET_CAMPAING,
    GetCampaing,
  );
  yield takeLatest(
    types.GET_CAMPAINGSMS,
    GetCampaingSMS,
  );
  yield takeLatest(
    types.GET_CAMPAINGSMSFILE,
    GetCampaingSMSFILE,
  );
  yield takeLatest(
    types.GET_CAMPAINGFILE,
    GetCampaingFILE,
  );
}

export default CampaingSaga;