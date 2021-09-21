//import { combineReducers } from 'redux';
import * as types from '../_types/login';

const stateShape = {
  loading: false,
  user: undefined,
};
const Login = (state = stateShape, action) => {
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
    case types.POST_FORGOT_PASS_KO: {
      return stateShape;
    }
    default: {
      return state
    }
  }
};

export default Login;

export const getUserToken = (state) => state.user.token;
