import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import * as types from '../_types/company';
import * as actions from '../_actions/company';
import * as api from '../_apis/company';
import * as reducers from '../_reducers';
import * as modalActions from '../_actions/modal';

function* fetchCompany() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.fetchCompany,
      token,
    );
    yield put(actions.fetchCompanyOK({
      company: response
    }));
  } catch (error) {
    yield put(actions.fetchCompanyKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo cargar las empresas',
    }));
  }
}

function* postCompany(action) {
  try {
    const {
      name,
      smsQuantity,
      emailQuantity,
      price_per_email,
      price_per_sms
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.postCompany,
      token,
      name,
      smsQuantity,
      emailQuantity,
      price_per_email,
      price_per_sms
    );
    yield put(actions.postCompanyOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Empresa Creada!"
    }));
    yield put(actions.fetchCompany());
  } catch (error) {
    yield put(actions.postCompanyKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo crear la empresa',
    }));
  }
}


function* deleteCompany(action) {
  try {
    const {
      id
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.deleteCompany,
      token,
      id
    );
    yield put(actions.deleteCompanyOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Empresa Eliminada!"
    }));
    yield put(actions.fetchCompany());
  } catch (error) {
    yield put(actions.deleteCompanyKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo eliminar la empresa',
    }));
  }
}

function* patchCompany(action) {
  try {
    const {
      id,
      name,
      smsQuantity,
      emailQuantity,
      price_per_email,
      price_per_sms
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.patchCompany,
      token,
      id,
      name,
      smsQuantity,
      emailQuantity,
      price_per_email,
      price_per_sms
    );
    yield put(actions.patchCompanyOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Empresa Actualizada!"
    }));
    yield put(actions.fetchCompany());
  } catch (error) {
    yield put(actions.postCompanyKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo actualizar la empresa',
    }));
  }
}

function* companySaga() {
  yield takeLatest(
    types.FETCH_COMPANY,
    fetchCompany,
  );
  yield takeLatest(
    types.POST_COMPANY,
    postCompany,
  );
  yield takeLatest(
    types.DELETE_COMPANY,
    deleteCompany,
  );
  yield takeLatest(
    types.PATCH_COMPANY,
    patchCompany,
  );
}

export default companySaga;