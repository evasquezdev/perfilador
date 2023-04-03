import URL from './routes';

export const sendMail = (
  token,
  text,
  Filter,
  date,
  time,
  company,
  dbs
) => new Promise((resolve, reject) => {
  let data = {"filters": null}
  let info = []
  Object.keys(Filter).map(function(key, index) {
    info[index] = {
       'column': key,
       'value': Filter[key]
     }  
  });

  let DB = dbs.join()
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
      'db_names': DB,
      "campaing_name": company,
      "programated_at": `${date && time !== ''? date +'|'+ time : null}`
    })
  }).then((resultado) => {
      if (resultado.ok) {
        resultado.json().then((res) => resolve(res));
      } else {
        reject("error");
        console.log(resultado.json)
      }
    }).catch((error) => {
      reject(error)
      console.log(error)
    });
});


export const sendEmail = (
  token,
  text,
  header,
  file,
  Filter,
  date,
  time,
  company,
  dbs
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
  let DB = dbs.join()
  let json = {
    "sms_text": header + '|' + text,
    "filters": info,
    'db_names': DB,
    "campaing_name": company,
    "programated_at": `${date && time !== ''? date +'|'+ time : null}`
  }
  let json_end =  JSON.stringify(json)
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