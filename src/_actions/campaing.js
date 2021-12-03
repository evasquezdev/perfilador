import * as types from '../_types/campaing';

export const fetchCampaing = () => ({
  type: types.FETCH_CAMPAING,
});

export const fetchCampaingOK = ({
  campaing
}) => ({
  type: types.FETCH_CAMPAING_OK,
  payload: {
    campaing
  }
});

export const fetchCampaingKO = () => ({
  type: types.FETCH_CAMPAING_KO
})


export const getCampaing = ({
  id
}) => ({
  type: types.GET_CAMPAING,
  payload: {
    id
  }
});

export const getCampaingOK = ({
  campaingData
}) => ({
  type: types.GET_CAMPAING_OK,
  payload: {
    campaingData
  }
});

export const getCampaingKO = () => ({
  type: types.GET_CAMPAING_KO
})