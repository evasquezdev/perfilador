import URL from './routes';

export const sendMail = (
  token,
  age_init,
  age_end,
  department,
  municipality,
  sex,
  sms_email,
  header,
  text,
  file,
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  age_init && dbData.append('age_init',age_init);
  age_end && dbData.append('age_end',age_end);
  department && dbData.append('department',department);
  municipality && dbData.append('municipality',municipality);
  dbData.append('sex',sex);
  dbData.append('sms_email',sms_email);
  dbData.append('header',header);
  dbData.append('text',text);
  dbData.append('file',file);
  fetch(`${URL}/filters/send_email/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: dbData
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});