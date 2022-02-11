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

export const fetchCampaingSMS = () => ({
  type: types.FETCH_CAMPAINGSMS,
});

export const fetchCampaingSMSOK = ({
  campaingSMS
}) => ({
  type: types.FETCH_CAMPAINGSMS_OK,
  payload: {
    campaingSMS
  }
});

export const fetchCampaingSMSKO = () => ({
  type: types.FETCH_CAMPAINGSMS_KO
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

export const getCampaingSMS = ({
  id
}) => ({
  type: types.GET_CAMPAINGSMS,
  payload: {
    id
  }
});

export const getCampaingSMSOK = ({
  campaingDataSMS
}) => ({
  type: types.GET_CAMPAINGSMS_OK,
  payload: {
    campaingDataSMS
  }
});

export const getCampaingSMSKO = () => ({
  type: types.GET_CAMPAINGSMS_KO
})

export const getCampaingSMSFILE = ({
  id
}) => ({
  type: types.GET_CAMPAINGSMSFILE,
  payload: {
    id
  }
});

export const getCampaingSMSFILEOK = ({
  campaingDataSMSFILE
}) => ({
  type: types.GET_CAMPAINGSMSFILE_OK,
  payload: {
    campaingDataSMSFILE
  }
});

export const getCampaingSMSFILEKO = () => ({
  type: types.GET_CAMPAINGSMSFILE_KO
})

export const getCampaingFILE = ({
  id
}) => ({
  type: types.GET_CAMPAINGFILE,
  payload: {
    id
  }
});

export const getCampaingFILEOK = ({
  campaingDataFILE
}) => ({
  type: types.GET_CAMPAINGFILE_OK,
  payload: {
    campaingDataFILE
  }
});

export const getCampaingFILEKO = () => ({
  type: types.GET_CAMPAINGFILE_KO
})

export const getCampaingFILEAnalitic = ({
  id
}) => ({
  type: types.GET_CAMPAINGFILEANALITIC,
  payload: {
    id
  }
});

export const getCampaingFILEANALITICOK = ({
  campaingDataFILE
}) => ({
  type: types.GET_CAMPAINGFILEANALITIC_OK,
  payload: {
    campaingDataFILE
  }
});

export const getCampaingFILEANALITICKO = () => ({
  type: types.GET_CAMPAINGFILEANALITIC_KO
})