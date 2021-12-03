import * as types from '../_types/campaing';

const stateShape = {
  loading: false,
  loadingData: false,
  campaing: [],
  campaingData: []
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
    default: {
      return {
        ...state,
      }
    }
  }
}

export default campaing;

export const getCampaing = (state) => state.campaing;
export const getCampaingloading = (state) => state.loading;

export const getCampaingData = (state) => state.campaingData;
export const getCampaingloadingData = (state) => state.loadingData;
