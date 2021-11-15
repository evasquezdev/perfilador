import URL from './routes';

export const sendMail = (
  token,
  text,
  Filter
) => new Promise((resolve, reject) => {
  let data = {"filters": null}
  let info = []
  Object.keys(Filter).map(function(key, index) {
    info[index] = {
       'column': key,
       'value': Filter[key]
     }  
  });
  data.filters = Filter
  fetch(`${URL}/filters/send_sms/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      "sms_text": text,
      "filters": info,
    })
  }).then((resultado) => {
      if (resultado.ok) {
        resultado.json().then((res) => resolve(res));
      } else {
        reject("error");
      }
    }).catch((error) => reject(error));
});


export const sendEmail = (
  token,
  text,
  header,
  //file,
  Filter
) => new Promise((resolve, reject) => {
  let data = {"filters": null}
  let info = []
  Object.keys(Filter).map(function(key, index) {
    info[index] = {
       'column': key,
       'value': Filter[key]
     }  
  });
  data.filters = Filter
  fetch(`${URL}/filters/send_email/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      "sms_text": header + '|' + text,
      "filters": info,
    })
  }).then((resultado) => {
      if (resultado.ok) {
        resultado.json().then((res) => resolve(res));
      } else {
        reject("error");
      }
    }).catch((error) => reject(error));
});