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

function* CampaingSaga() {
  yield takeLatest(
    types.FETCH_CAMPAING,
    fetchCampaing,
  );
  yield takeLatest(
    types.GET_CAMPAING,
    GetCampaing,
  );
}

export default CampaingSaga;