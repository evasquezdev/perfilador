import {
  put,
  takeLatest,
  call,
  select,
} from 'redux-saga/effects';
import * as types from '../_types/user';
import * as actions from '../_actions/user';
import * as api from '../_apis/user';
import * as reducers from '../_reducers';
import * as modalActions from '../_actions/modal';

function* fetchUser() {
  try {
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.fetchUser,
      token,
    );
    yield put(actions.fetchUserOK({
      user: response
    }));
  } catch (error) {
    yield put(actions.fetchUserKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo cargar los Usuarios',
    }));
  }
}

function* postUser(action) {
  try {
    const {
      name,
      email,
      password,
      company
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.postUser,
      token,
      name,
      email,
      password,
      company
    );
    yield put(actions.postUserOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Usuario Creado!"
    }));
    yield put(actions.fetchUser());
  } catch (error) {
    yield put(actions.postUserKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo crear el Usuario',
    }));
  }
}


function* deleteUser(action) {
  try {
    const {
      id
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.deleteUser,
      token,
      id
    );
    yield put(actions.deleteUserOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Usuario Eliminado!"
    }));
    yield put(actions.fetchUser());
  } catch (error) {
    yield put(actions.deleteUserKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo eliminar el Usuario',
    }));
  }
}

function* patchUser(action) {
  try {
    const {
      id,
      name,
      company
    } = action.payload;
    const token = yield select(reducers.getUserToken);
    const response = yield call(
      api.patchUser,
      token,
      id,
      name,
      company
    );
    yield put(actions.patchUserOK({
      msg: response
    }));
    yield put(modalActions.showSuccess({
      title: 'Mensaje',
      message: "Usuario Actualizado!"
    }));
    yield put(actions.fetchUser());
  } catch (error) {
    yield put(actions.patchUserKO());
    yield put(modalActions.showError({
      title: 'Hubo un error',
      message: 'No se pudo actualizar el Usuario',
    }));
  }
}

function* userSaga() {
  yield takeLatest(
    types.FETCH_USER,
    fetchUser,
  );
  yield takeLatest(
    types.POST_USER,
    postUser,
  );
  yield takeLatest(
    types.DELETE_USER,
    deleteUser,
  );
  yield takeLatest(
    types.PATCH_USER,
    patchUser,
  );
}

export default userSaga;