import * as types from '../_types/login';

export const register = ({
  email,
  first_name,
  last_name,
  username,
  pass,
  project_id,
}) => ({
  type: types.POST_REGISTER,
  payload: {
    email,
    first_name,
    last_name,
    username,
    pass,
    project_id,
  }
});

export const registerOK = ({
  user,
}) => ({
  type: types.POST_REGISTER_OK,
  payload: {
    user,
  }
});

export const registerKO = ({
  error,
}) => ({
  type: types.POST_REGISTER_KO,
  payload: {
    error,
  }
});

export const signin = ({
  email,
  password
}) => ({
  type: types.POST_SIGNIN,
  payload: {
    email,
    password,
  }
});

export const signinOK = ({
  user,
}) => ({
  type: types.POST_SIGNIN_OK,
  payload: {
    user,
  }
});

export const signinKO = ({
  error,
}) => ({
  type: types.POST_SIGNIN_KO,
  payload: {
    error,
  }
});

export const logOut = () => ({
  type: types.LOGOFF_SUCCEEDED,
  payload: {}
});


export const forgot = ({
  email,
}) => ({
  type: types.POST_FORGOT_PASS,
  payload: {
    email,
  }
});

export const forgotOK = ({
  user,
}) => ({
  type: types.POST_FORGOT_PASS_OK,
  payload: {
    user,
  }
});

export const forgotKO = ({
  error,
}) => ({
  type: types.POST_FORGOT_PASS_KO,
  payload: {
    error,
  }
});

export const confirm = ({
  email,
  token
}) => ({
  type: types.POST_CONFIRM_TOKEN,
  payload: {
    email,
    token
  }
});

export const confirmOK = ({
  user,
}) => ({
  type: types.POST_CONFIRM_TOKEN_OK,
  payload: {
    user,
  }
});

export const confirmKO = ({
  error,
}) => ({
  type: types.POST_CONFIRM_TOKEN_OK,
  payload: {
    error,
  }
});

export const reset = ({
  email,
  token
}) => ({
  type: types.POST_RESET_PASS,
  payload: {
    email,
    token
  }
});

export const resetOK = ({
  user,
}) => ({
  type: types.POST_RESET_PASS_OK,
  payload: {
    user,
  }
});

export const resetKO = ({
  error,
}) => ({
  type: types.POST_RESET_PASS_KO,
  payload: {
    error,
  }
});