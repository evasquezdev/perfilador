//import { combineReducers } from 'redux';
import * as types from '../_types/login';

const stateShape = {
  loading: false,
  user: null,
};
const login = (state = stateShape, action) => {
  switch (action.type) {
    case types.POST_SIGNIN: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.POST_SIGNIN_OK: {
      const {
        payload: {
          user,
        },
      } = action;
      return {
        ...state,
        user,
      };
    }
    case types.POST_REGISTER_KO:
    case types.POST_SIGNIN_KO:
    case types.POST_RESET_PASS_KO:
    case types.POST_CONFIRM_TOKEN_KO:
    case types.POST_SIGNOUT_OK:
    case types.LOGOFF_SUCCEEDED:
    case types.POST_FORGOT_PASS_KO: {
      return stateShape;
    }
    default: {
      return state
    }
  }
};

export default login;

export const getUserToken = (state) => {
  return state.user ? state.user.token : null;
}

export const getUserMsgInfo = (state) => ({
  quantity_of_emails: state.user.company.quantity_of_emails,
  quantity_of_sms: state.user.company.quantity_of_sms,
})

export const getUserCompany = (state) => {
  return state.user ? state.user.company : null;
}