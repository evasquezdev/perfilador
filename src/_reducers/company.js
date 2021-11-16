import * as types from '../_types/company';

const stateShape = {
  loading: false,
  company: [],
};

const company = (state = stateShape, action) => {
  switch (action.type) {
    case types.FETCH_COMPANY: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.FETCH_COMPANY_OK: {
      const {
        company
      } = action.payload;
      return {
        ...state,
        loading: false,
        company
      }
    }
    case types.FETCH_COMPANY_KO: {
      return {
        ...state,
        loading: false,
        company: [],
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default company;

export const getCompany = (state) => state.company;
export const getCompanyloading = (state) => state.loading;
