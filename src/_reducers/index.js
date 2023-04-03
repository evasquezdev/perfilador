import { combineReducers } from 'redux';
import { reducer as reducerForm } from 'redux-form';

import login, * as loginHandler from './login';
import db, * as dbHandler from './db';
import modal, * as fromModal from './modal';
import filter, * as filterHandler from './filter';
import action, * as actionHandler from './action';
import dashboard, * as dashboardHandler from './dashboard';
import company, * as companyHandler from './company';
import user, * as userHandler from './user';
import campaing , * as campaingHandler from './campaing';

export default combineReducers({
  login,
  db,
  modal,
  filter,
  action,
  dashboard,
  company,
  user,
  campaing,
  form: reducerForm,
});

//login
export const getUserToken = (state) => loginHandler.getUserToken(state.login);
export const getUserMsgInfo = (state) => loginHandler.getUserMsgInfo(state.login);
export const getUserCompany = (state) => loginHandler.getUserCompany(state.login);


//db
export const getDBs = (state) => dbHandler.getDBs(state.db);
export const getDbsFilter = (state) => dbHandler.getDbsFilter(state.db);
export const getDBloading = (state) => dbHandler.getDBloading(state.db);

//modal
export const getModalType = (state) => fromModal.getModalType(state.modal);
export const getModalMessage = (state) => fromModal.getModalMessage(state.modal);
export const getModalTitle = (state) => fromModal.getModalTitle(state.modal);
export const getModalRowData = (state) => fromModal.getModalRowData(state.modal);

//filter
export const getInfo = (state) => filterHandler.getInfo(state.filter);
export const getFilters = (state) => filterHandler.getFilters(state.filter);
export const getDepartments = (state) => filterHandler.getDepartments(state.filter);
export const getMunicipalities = (state) => filterHandler.getMunicipalities(state.filter);
export const getFilterData = (state) => filterHandler.getFilterData(state.filter);
export const getFilterDataHistory = (state) => filterHandler.getFilterDataHistory(state.filter);
export const getFilterloading = (state) => filterHandler.getFilterloading(state.filter);
export const getFilterloadingData = (state) => filterHandler.getFilterloadingData(state.filter);

//action
export const getActionloading = (state) => actionHandler.getActionloading(state.action);

export const getDashBoardLoading = (state) => dashboardHandler.getDashBoardLoading(state.dashboard);
export const getDashBoardData = (state) => dashboardHandler.getDashBoardData(state.dashboard);
export const getDashBoardMonth = (state) => dashboardHandler.getDashBoardMonth(state.dashboard);


//company
export const getCompany = (state) => companyHandler.getCompany(state.company);
export const getCompanyloading = (state) => companyHandler.getCompanyloading(state.company);

//user
export const getUser = (state) => userHandler.getUser(state.user);
export const getUserloading = (state) => userHandler.getUserloading(state.user);

//campaing
export const getCampaing = (state) => campaingHandler.getCampaing(state.campaing);
export const getCampaingSMS = (state) => campaingHandler.getCampaingSMS(state.campaing);

export const getCampaingloading = (state) => campaingHandler.getCampaingloading(state.campaing);
export const getCampaingData = (state) => campaingHandler.getCampaingData(state.campaing);
export const getCampaingDataSMS = (state) => campaingHandler.getCampaingDataSMS(state.campaing);
export const getCampaingloadingData = (state) => campaingHandler.getCampaingloadingData(state.campaing);
