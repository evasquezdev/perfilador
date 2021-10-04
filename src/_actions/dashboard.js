import * as types from '../_types/dashboard';

export const getDashboard = () => ({
  type: types.GET_DASHBOARD
});

export const getDashboardOK = ({
  data,
  actual_month_data,
}) => ({
  type: types.GET_DASHBOARD_OK,
  payload: {
    data,
    actual_month_data,
  }
});

export const getDashboardKO = () => ({
  type: types.GET_DASHBOARD_KO
});