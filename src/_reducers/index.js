import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';

import login, * as loginHandler from './login';

import db, * as dbHandler from './db';

import modal, * as fromModal from './modal';

import filter, * as filterHandler from './filter';

export default combineReducers({
  login,
  db,
  modal,
  filter,
  form: reducerForm,
});

//login
export const getUserToken = (state) => loginHandler.getUserToken(state.login);
export const getUserMsgInfo = (state) => loginHandler.getUserMsgInfo(state.login);

//db
export const getDBs = (state) => dbHandler.getDBs(state.db);
export const getDBloading = (state) => dbHandler.getDBloading(state.db);

//modal
export const getModalType = (state) => fromModal.getModalType(state.modal);
export const getModalMessage = (state) => fromModal.getModalMessage(state.modal);
export const getModalTitle = (state) => fromModal.getModalTitle(state.modal);
export const getModalRowData = (state) => fromModal.getModalRowData(state.modal);

//filter
export const getDepartments = (state) => filterHandler.getDepartments(state.filter);
export const getMunicipalities = (state) => filterHandler.getMunicipalities(state.filter);
export const getFilterData = (state) => filterHandler.getFilterData(state.filter);
export const getFilterloading = (state) => filterHandler.getFilterloading(state.filter);