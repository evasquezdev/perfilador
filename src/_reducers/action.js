import * as types from '../_types/action';

const stateShape = {
    loading: false,
  };
  
  const action = (state = stateShape, action) => {
    switch(action.type){
      case types.SEND_EMAIL: {
        return {
          ...state,
          loading: true,
        }
      }
      case types.SEND_EMAIL_OK: {
        return {
          ...state,
          loading: false,
        }
      }
      case types.SEND_EMAIL_KO: {
        return {
          ...state,
          loading: false,
        }
      }
      default: {
        return {
          ...state,
        }
      }
    }
  }
  
  export default action;
  
  export const getActionloading = (state) => state.loading;