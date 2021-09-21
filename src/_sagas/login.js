import {
  put,
  takeLatest,
  call,
  //select,
} from 'redux-saga/effects';
import * as types from '../_types/login';
import * as actions from '../_actions/login';
import * as api from '../_apis/login';
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
  }
}

function* LoginSaga() {
  yield takeLatest(
    types.POST_SIGNIN,
    doSignIn,
  );
}

export default LoginSaga;