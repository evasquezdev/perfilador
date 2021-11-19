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
  file,
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
  data.filters = Filter;
  let json = {
    "sms_text": header + '|' + text,
    "filters": info,
  }
  let json_end =  JSON.stringify(json)
  console.log('json', json_end)
  const datas = new FormData();
  datas.append('json_data', json_end);
  datas.append('file', file);
  fetch(`${URL}/filters/send_email/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: datas
  }).then((resultado) => {
      if (resultado.ok) {
        resultado.json().then((res) => resolve(res));
      } else {
        reject("error");
      }
    }).catch((error) => reject(error));
});