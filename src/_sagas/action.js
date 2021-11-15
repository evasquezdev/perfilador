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
import * as actionsFilter from '../_actions/filter'

function* sendMail(action) {
  try {
    const {
      text,
      Filter
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.sendMail,
      token,
      text,
      Filter
    );
    yield put(actions.sendMailOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Mensaje Enviado"
    }));
  //  yield put(push('/admin/enviosSMS'));
    //yield put(actionsFilter.filterInfo);
  } catch (error) {
    yield put(actions.sendMailKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo enviar el correo',
    }));
  }
}

function* sendEmail(action) {
  try {
    const {
      text,
      header,
      // file,
      Filter
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.sendEmail,
      token,
      text,
      header,
      // file,
      Filter
    );
    yield put(actions.sendEmailOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Mensaje Enviado"
    }));
    yield put(actionsFilter.filterInfo());
  // yield push('/admin/enviosEmail');
  } catch (error) {
    yield put(actions.sendEmailOK());
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
  yield takeLatest(
    types.SEND_MAIL,
    sendEmail,
  );
}

export default actionSaga;