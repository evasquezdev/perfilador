import URL from './routes';

export const getDepts = (
  token
) => new Promise((resolve, reject) => {
  fetch(`${URL}/databases/get_filters/`, {
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
  FilterForm
) => new Promise((resolve, reject) => {
  let data = {"filters": null}
  let info = []
 
  Object.keys(FilterForm).map(function(key, index) {
    info[index] = {
       'column': key,
       'value': FilterForm[key]
     }  
  });
  data.filters = FilterForm
   
  console.log('data',info)
  fetch(`${URL}/filters/get_filtered_data/`, {
    method: 'POST',
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
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