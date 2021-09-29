import * as types from '../_types/action';

export const sendMail = ({
  age_init,
  age_end,
  department,
  municipality,
  sex,
  sms_email,
  header,
  text,
  file
}) => ({
  type: types.SEND_EMAIL,
  payload: {
    age_init,
    age_end,
    department,
    municipality,
    sex,
    sms_email,
    header,
    text,
    file
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