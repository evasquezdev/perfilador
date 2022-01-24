import * as types from '../_types/campaing';

const stateShape = {
  loading: false,
  loadingData: false,
  campaing: [],
  campaingSMS: [],
  campaingData: [],
  campaingDataSMS: []
};

const campaing = (state = stateShape, action) => {
  switch (action.type) {
    case types.FETCH_CAMPAING: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.FETCH_CAMPAING_OK: {
      const {
        campaing
      } = action.payload;
      return {
        ...state,
        loading: false,
        campaing
      }
    }
    case types.FETCH_CAMPAING_KO: {
      return {
        ...state,
        loading: false,
        campaing: [],
      }
    }

    case types.FETCH_CAMPAINGSMS: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.FETCH_CAMPAINGSMS_OK: {
      const {
        campaingSMS
      } = action.payload;
      return {
        ...state,
        loading: false,
        campaingSMS
      }
    }
    case types.FETCH_CAMPAINGSMS_KO: {
      return {
        ...state,
        loading: false,
        campaingSMS: [],
      }
    }

    case types.GET_CAMPAING: {
      return {
        ...state,
        loadingData: true,
      }
    }
    case types.GET_CAMPAING_OK: {
      const {
        campaingData
      } = action.payload;
      return {
        ...state,
        loadingData: false,
        campaingData
      }
    }
    case types.GET_CAMPAING_KO: {
      return {
        ...state,
        loadingData: false,
        campaingData: [],
      }
    }

    case types.GET_CAMPAINGSMS: {
      return {
        ...state,
        loadingData: true,
      }
    }
    case types.GET_CAMPAINGSMS_OK: {
      const {
        campaingDataSMS
      } = action.payload;
      return {
        ...state,
        loadingData: false,
        campaingDataSMS
      }
    }
    case types.GET_CAMPAINGSMS_KO: {
      return {
        ...state,
        loadingData: false,
        campaingDataSMS: [],
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default campaing;

export const getCampaing = (state) => state.campaing;
export const getCampaingSMS = (state) => state.campaingSMS;

export const getCampaingloading = (state) => state.loading;

export const getCampaingData = (state) => state.campaingData;
export const getCampaingDataSMS = (state) => state.campaingDataSMS;
export const getCampaingloadingData = (state) => state.loadingData;
