import * as types from '../_types/db';

export const getDbs = () => ({
  type: types.GET_DBS
});

export const getDbsOK = ({
  dbs
}) => ({
  type: types.GET_DBS_OK,
  payload: {
    dbs
  }
});

export const getDbsKO = () => ({
  type: types.GET_DBS_KO
});

export const postDb = ({
  file,
  name,
  abbreviation,
}) => ({
  type: types.POST_DB,
  payload: {
    file,
    name,
    abbreviation,
  }
});

export const postDbOK = ({
  db,
}) => ({
  type: types.POST_DB_OK,
  payload: {
    db,
  }
});

export const postDbKO = () => ({
  type: types.POST_DB_KO
});

export const syncDb = ({
  database
}) => ({
  type: types.POST_SYNC_DB,
  payload: {
    database
  }
});

export const syncDbOK = ({
  response
}) => ({
  type: types.POST_SYNC_DB_OK,
  payload: {
    response
  }
});

export const syncDbKO = () => ({
  type: types.POST_SYNC_DB_KO
});

export const deleteDb = ({
  database
}) => ({
  type: types.POST_DELETE_DB,
  payload: {
    database
  }
});

export const deleteDbOK = ({
  response
}) => ({
  type: types.POST_DELETE_DB_OK,
  payload: {
    response
  }
});

export const deleteDbKO = () => ({
  type: types.POST_DELETE_DB_KO
});


export const getDbsFilter = () => ({
  type: types.GET_DBS_FILTER
});

export const getDbsFilterOK = ({
  dbsfilter
}) => ({
  type: types.GET_DBS_FILTER_OK,
  payload: {
    dbsfilter
  }
});

export const getDbsFilterKO = () => ({
  type: types.GET_DBS_FILTER_KO
});