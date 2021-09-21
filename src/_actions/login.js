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