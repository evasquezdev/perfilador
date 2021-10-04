import * as types from '../_types/dashboard';

const defaultState = {
  loading: false,
  data: {
    accepted: [],
    delivered: [],
    failed: [],
    opened: [],
    clicked: [],
    complained: [],
  },
  actual_month_data: {
    accepted: 0,
    delivered: 0,
    failed: 0,
    opened: 0,
    clicked: 0,
    complained: 0
  },
}

const dashboard = (state = defaultState, action) => {
  switch(action.type) {
    case types.GET_DASHBOARD: {
      return {
        ...state,
        loading: true
      }
    }
    case types.GET_DASHBOARD_OK: {
      const {
        data,
        actual_month_data,
      } = action.payload;
      return {
        ...state,
        loading: false,
        data,
        actual_month_data,
      }
    }
    case types.GET_DASHBOARD_KO: {
      return {
        ...defaultState
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default dashboard;

export const getDashBoardLoading = (state) => state.loading;
export const getDashBoardData = (state) => state.data;
export const getDashBoardMonth = (state) => state.actual_month_data;