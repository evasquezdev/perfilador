import URL from './routes';


export const fetchCampaing = (
  token,
) => new Promise((resolve, reject) => {
  fetch(`${URL}/campaign/my_campaigns/`, {
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

export const getCampaing = (
  token,
  id
) => new Promise((resolve, reject) => {
  fetch(`${URL}/campaign/get_email_campaign/?campaign=${id}`, {
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