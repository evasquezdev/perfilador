import * as types from '../_types/filter';

export const getDeps = () => ({
  type: types.GET_DEP_MUNI
});

export const getDepsOK = ({
  deparments,
  municipalities,
}) => ({
  type: types.GET_DEP_MUNI_OK,
  payload: {
    deparments,
    municipalities,
  }
});

export const getDepsKO = () => ({
  type: types.GET_DEP_MUNI_KO
});

export const filterData = ({
  FilterForm
}) => ({
  type: types.FILTER_DATA,
  payload: {
    FilterForm
  }
});

export const filterDataOK = ({
  data
}) => ({
  type: types.FILTER_DATA_OK,
  payload: {
    data
  }
});

export const filterDataKO = () => ({
  type: types.FILTER_DATA_KO
})