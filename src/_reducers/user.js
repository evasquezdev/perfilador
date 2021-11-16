import * as types from '../_types/user';

const stateShape = {
  loading: false,
  user: [],
};

const user = (state = stateShape, action) => {
  switch (action.type) {
    case types.FETCH_USER: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.FETCH_USER_OK: {
      const {
        user
      } = action.payload;
      return {
        ...state,
        loading: false,
        user
      }
    }
    case types.FETCH_USER_KO: {
      return {
        ...state,
        loading: false,
        user: [],
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default user;

export const getUser = (state) => state.user;
export const getUserloading = (state) => state.loading;
