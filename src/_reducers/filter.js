import * as types from '../_types/filter';

const stateShape = {
  loading: false,
  deparments: [],
  municipalities: [],
  data: null,
};

const filter = (state = stateShape, action) => {
  switch(action.type){
    case types.GET_DEP_MUNI: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.GET_DEP_MUNI_OK: {
      const {
        deparments,
        municipalities
      } = action.payload;
      return {
        ...state,
        loading: false,
        deparments,
        municipalities
      }
    }
    case types.GET_DEP_MUNI_KO: {
      return {
        ...state,
        loading: false,
        deparments: [],
        municipalities: []
      }
    }
    case types.FILTER_DATA: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.FILTER_DATA_OK: {
      const {
        data
      } = action.payload;
      return {
        ...state,
        loading: false,
        data,
      }
    }
    case types.FILTER_DATA_KO: {
      return {
        ...state,
        loading: false,
        data: null,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default filter;

export const getDepartments = (state) => state.deparments;
export const getMunicipalities = (state) => state.municipalities;
export const getFilterData = (state) => state.data;
export const getFilterloading = (state) => state.loading;