import {
  put,
  takeLatest,
  call,
  //select,
} from 'redux-saga/effects';
import * as types from '../_types/login';
import * as actions from '../_actions/login';
import * as api from '../_apis/login';
import * as modalActions from '../_actions/modal';

/*import {
  getUserToken
} from '../_reducers';*/

function* doSignIn(action) {
  const {
    payload: {
      email,
      password,
    },
  } = action;
  try {
    const response = yield call(
      api.doSignIn,
      email,
      password,
    );
    yield put(actions.signinOK({
      user: response
    }));
  } catch (error) {
    yield put(actions.signinKO({
      error: error.message,
    }));
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'Credenciales incorrectas',
    }));
  }
}

function* forgot(action) {
  const {
    payload: {
      email,
    },
  } = action;
  try {
    const response = yield call(
      api.doForgot,
      email,
    );
    yield put(actions.forgotOK({
      user: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Hubo un error',
      message: 'Codigo enviado',
    }));
  } catch (error) {
    yield put(actions.forgotKO({
      error: error.message,
    }));
  }
}

function* confirm(action) {
  const {
    payload: {
      email,
      token
    },
  } = action;
  try {
    const response = yield call(
      api.doConfirm,
      email,
      token
    );
    yield put(actions.confirmOK({
      user: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Hubo un error',
      message: 'Código confirmado',
    }));
  } catch (error) {
    yield put(actions.confirmKO({
      error: error.message,
    }));
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'Código incorrecto',
    }));
  }
}

function* reset(action) {
  const {
    payload: {
      email,
      token
    },
  } = action;
  try {
    const response = yield call(
      api.doReset,
      email,
      token
    );
    yield put(actions.resetOK({
      user: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Hubo un error',
      message: 'Contraseña cambiada',
    }));
  } catch (error) {
    yield put(actions.resetKO({
      error: error.message,
    }));
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'Error al cambiar contraseña',
    }));
  }
}

function* LoginSaga() {
  yield takeLatest(
    types.POST_SIGNIN,
    doSignIn,
  );
  yield takeLatest(
    types.POST_FORGOT_PASS,
    forgot,
  );
  yield takeLatest(
    types.POST_CONFIRM_TOKEN,
    confirm,
  );
  yield takeLatest(
    types.POST_RESET_PASS,
    reset,
  );
}

export default LoginSaga;