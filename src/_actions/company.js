import * as types from '../_types/company';

export const fetchCompany = () => ({
  type: types.FETCH_COMPANY,
});

export const fetchCompanyOK = ({
  company
}) => ({
  type: types.FETCH_COMPANY_OK,
  payload: {
    company
  }
});

export const fetchCompanyKO = () => ({
  type: types.FETCH_COMPANY_KO
})

export const postCompany = ({
  name,
  smsQuantity,
  emailQuantity,
  price_per_email,
  price_per_sms
}) => ({
  type: types.POST_COMPANY,
  payload: {
    name,
    smsQuantity,
    emailQuantity,
    price_per_email,
    price_per_sms
  }
});
export const postCompanyOK = ({
  msg
}) => ({
  type: types.POST_COMPANY_OK,
  payload: {
    msg
  }
});
export const postCompanyKO = ({
  msg
}) => ({
  type: types.POST_COMPANY_KO,
  payload: {
    msg
  }
});


export const deleteCompany = ({
  id
}) => ({
  type: types.DELETE_COMPANY,
  payload: {
    id
  }
});
export const deleteCompanyOK = ({
  msg
}) => ({
  type: types.DELETE_COMPANY_OK,
  payload: {
    msg
  }
});
export const deleteCompanyKO = ({
  msg
}) => ({
  type: types.DELETE_COMPANY_KO,
  payload: {
    msg
  }
});


export const patchCompany = ({
  id,
  name,
  smsQuantity,
  emailQuantity,
  price_per_email,
  price_per_sms
}) => ({
  type: types.PATCH_COMPANY,
  payload: {
    id,
    name,
    smsQuantity,
    emailQuantity,
    price_per_email,
    price_per_sms
  }
});
export const patchCompanyOK = ({
  msg
}) => ({
  type: types.PATCH_COMPANY_OK,
  payload: {
    msg
  }
});
export const patchCompanyKO = ({
  msg
}) => ({
  type: types.PATCH_COMPANY_KO,
  payload: {
    msg
  }
});