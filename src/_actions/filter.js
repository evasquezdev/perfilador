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


export const getfilter = () => ({
  type: types.GET_FILTER
});

export const getFilterOK = ({
  filters
}) => ({
  type: types.GET_FILTER_OK,
  payload: {
    filters
  }
});

export const getFilterKO = () => ({
  type: types.GET_FILTER_KO
});

export const downloadfilterData = ({
  FilterForm,
  dbs,
  index
}) => ({
  type: types.DOWNLOADFILTER_DATA,
  payload: {
    FilterForm,
    dbs,
    index
  }
});

export const downloadfilterDataOK = ({
  data
}) => ({
  type: types.DOWNLOADFILTER_DATA_OK,
  payload: {
    data
  }
});

export const downloadfilterDataKO = () => ({
  type: types.DOWNLOADFILTER_DATA_KO
})

export const filterData = ({
  FilterForm,
  dbs,
  index
}) => ({
  type: types.FILTER_DATA,
  payload: {
    FilterForm,
    dbs,
    index
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



export const changeFlag = ({
  value,
  flag
}) => ({
  type: types.CHANGE_FLAG,
  payload: {
    value,
    flag
  }
});

export const changeFlagOK = ({
  data
}) => ({
  type: types.CHANGE_FLAG_OK,
  payload: {
    data
  }
});

export const changeFlagKO = () => ({
  type: types.CHANGE_FLAG_KO
})


export const filterInfo = () => ({
  type: types.GET_INFO,
  
});

export const filterInfoOK = ({
  info
}) => ({
  type: types.GET_INFO_OK,
  payload: {
    info
  }
});

export const filterInfoKO = () => ({
  type: types.GET_INFO_KO
})



