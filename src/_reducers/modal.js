import * as types from '../_types/modal';

const stateShape = {
  type: undefined,
  message:undefined,
  title: undefined,
  row: {
    id: undefined,
    data: undefined,
  }
};

const modal = (state = stateShape, action) => {
  switch (action.type) {
    case types.ERROR_SHOW: {
      const {
        payload: {
          message,
          title,
        }
      } = action;
      const newState = {
        ...state,
        message,
        title,
        type: "error",
      };
      return newState;
    }
    case types.SUCCESSS_SHOW: {
      const {
        payload: {
          message,
          title,
        }
      } = action;
      const newState = {
        ...state,
        message,
        title,
        type: "success",
      };
      return newState;
    }
    case types.UPDATE_SHOW: {
      const {
        payload: {
          id,
          data,
        }
      } = action;
      const newState = {
        ...state, 
        type: "update",
        row: {
          id,
          data,
        }
      }
      return newState;
    }
    case types.PREVIEW_SHOW: {
      const {
        payload: {
          id,
          data,
        }
      } = action;
      const newState = {
        ...state, 
        type: "preview",
        row: {
          id,
          data,
        }
      }
      return newState;
    }

    case types.DOWNLOAD_SHOW: {
      const {
        payload: {
          id,
          data,
        }
      } = action;
      const newState = {
        ...state, 
        type: "downloadP",
        row: {
          id,
          data,
        }
      }
      return newState;
    }
    case types.MODAL_HIDDEN: {
      return stateShape;
    }
    default: {
      return state;
    }
  }
}

export default modal;

export const getModalType = (state) => state.type;
export const getModalMessage = (state) => state.message;
export const getModalTitle = (state) => state.title;
export const getModalRowData = (state) => state.row;