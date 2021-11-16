import * as types from '../_types/user';

export const fetchUser = () => ({
  type: types.FETCH_USER,
});

export const fetchUserOK = ({
  user
}) => ({
  type: types.FETCH_USER_OK,
  payload: {
    user
  }
});

export const fetchUserKO = () => ({
  type: types.FETCH_USER_KO
})

export const postUser = ({
  name,
  email,
  password,
  company
}) => ({
  type: types.POST_USER,
  payload: {
    name,
    email,
    password,
    company
  }
});
export const postUserOK = ({
  msg
}) => ({
  type: types.POST_USER_OK,
  payload: {
    msg
  }
});
export const postUserKO = ({
  msg
}) => ({
  type: types.POST_USER_KO,
  payload: {
    msg
  }
});


export const deleteUser = ({
  id
}) => ({
  type: types.DELETE_USER,
  payload: {
    id
  }
});
export const deleteUserOK = ({
  msg
}) => ({
  type: types.DELETE_USER_OK,
  payload: {
    msg
  }
});
export const deleteUserKO = ({
  msg
}) => ({
  type: types.DELETE_USER_KO,
  payload: {
    msg
  }
});


export const patchUser = ({
  id,
 name,
  company
}) => ({
  type: types.PATCH_USER,
  payload: {
    id,
    name,
    company
  }
});
export const patchUserOK = ({
  msg
}) => ({
  type: types.PATCH_USER_OK,
  payload: {
    msg
  }
});
export const patchUserKO = ({
  msg
}) => ({
  type: types.PATCH_USER_KO,
  payload: {
    msg
  }
});