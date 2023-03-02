import * as types from '../_types/action';

export const sendMail = ({
  text,
  group
}) => ({
  type: types.SEND_EMAIL,
  payload: {
    text,
    group
  }
});

export const sendMailOK = ({
  msg
}) => ({
  type: types.SEND_EMAIL_OK,
  payload: {
    msg
  }
});

export const sendMailKO = () => ({
  type: types.SEND_EMAIL_KO
})

export const sendEmail = ({
  text,
  group

}) => ({
  type: types.SEND_MAIL,
  payload: {
    text,
    group
  }
});

export const sendEmailOK = ({
  msg
}) => ({
  type: types.SEND_EMAIL_OK,
  payload: {
    msg
  }
});

export const sendEmailKO = () => ({
  type: types.SEND_EMAIL_KO
})