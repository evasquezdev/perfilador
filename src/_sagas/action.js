import {
    put,
    takeLatest,
    call,
    select,
  } from 'redux-saga/effects';
  import * as types from '../_types/action';
  import * as actions from '../_actions/action';
  import * as api from '../_apis/action';
  import * as reducers from '../_reducers';
  import * as modalActions from '../_actions/modal';  

function* sendMail(action) {
  try {
    const {
      age_init,
      age_end,
      department,
      municipality,
      sex,
      sms_email,
      header,
      text,
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.sendMail,
      token,
      age_init,
      age_end,
      department,
      municipality,
      sex,
      sms_email,
      header,
      text,
    );
    yield put(actions.sendMailOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Mensaje Enviado"
    }));
  } catch (error) {
    yield put(actions.sendMailKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo enviar el correo',
    }));
  }
}

function* actionSaga() {
  yield takeLatest(
    types.SEND_EMAIL,
    sendMail,
  );
}

export default actionSaga;