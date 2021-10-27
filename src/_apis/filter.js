import URL from './routes';

export const getDepts = (
  token
) => new Promise((resolve, reject) => {
  fetch(`${URL}/filters/deparments_and_municipality/`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    }
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});


export const getFilterData = (
  token,
  age_end,
  age_init,
  departmentid,
  departmentlabel,
  file,
  header,
  municipality,
  range,
  sex,
  sms_email,
  text
) => new Promise((resolve, reject) => {
  const _age_init = age_init ? `age_init=${age_init}` : null;
  const _age_end = age_end ? `age_end=${age_end}` : null;
  const ranges = range !== '' ? `age_init=${range}` : null;
  const _department = departmentlabel !== '' ? `department=${departmentlabel}` : null;
  const _municipality = municipality !== '' ? `municipality=${municipality}` : null;
  const _sex = sex ? `sex=${sex}` : null;
  const _sms_email = sms_email ? `sms_email=${sms_email}` : null;
  const urlData = [_age_init, _age_end, ranges, _department, _municipality, _sex, _sms_email].filter(x => x).join("&")
  fetch(`${URL}/filters/get_filtered_data/${urlData !== '' ? `?${urlData}` : ''}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    }
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});