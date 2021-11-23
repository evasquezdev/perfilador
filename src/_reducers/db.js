import * as types from '../_types/db';

const stateShape = {
  loading: false,
  dbs: [],
  dbsfilter: []
};

const db = (state = stateShape, action) => {
  switch(action.type){
    case types.GET_DBS: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.GET_DBS_FILTER: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.GET_DBS_OK: {
      const {
        dbs
      } = action.payload;
      return {
        ...state,
        loading: false,
        dbs,
      }
    }
    case types.GET_DBS_FILTER_OK: {
      const {
        dbsfilter
      } = action.payload;
      return {
        ...state,
        loading: false,
        dbsfilter,
      }
    }
    case types.GET_DBS_KO: {
      return {
        ...state,
        loading: false,
        dbs: null,
      }
    }
    case types.GET_DBS_FILTER_KO: {
      return {
        ...state,
        loading: false,
        dbsfilter: null,
      }
    }
    case types.POST_DB: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.POST_DB_OK: {
      return {
        ...state,
        loading: false
      }
    }
    case types.POST_DB_KO: {
      return {
        ...state,
        loading: false
      }
    }
    case types.POST_SYNC_DB: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.POST_SYNC_DB_KO:
    case types.POST_SYNC_DB_OK: {
      return {
        ...state,
        loading: false
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default db;

export const getDBs = (state) => state.dbs;
export const getDbsFilter = (state) => state.dbsfilter;
export const getDBloading = (state) => state.loading;