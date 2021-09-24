import * as types from '../_types/modal';

export const showError = ({
  message,
  title,
}) => ({
  type: types.ERROR_SHOW,
  payload: {
    message,
    title,
  }
});

export const showSuccess = ({
  message,
  title,
}) => ({
  type: types.SUCCESSS_SHOW,
  payload: {
    message,
    title,
  }
});

export const showDownload = ({
  message,
  title,
}) => ({
  type: types.DOWNLOAD_SHOW,
  payload: {
    message,
    title,
  }
});

export const showUpdate = ({
  id,
  data
}) => ({
  type: types.UPDATE_SHOW,
  payload: {
    id,
    data,
  }
})

export const showPreview = ({
  id,
  data
}) => ({
  type: types.PREVIEW_SHOW,
  payload: {
    id,
    data,
  }
})

export const hideModal = () => ({
  type: types.MODAL_HIDDEN,
  payload: {
  }
});


