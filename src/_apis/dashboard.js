import URL from './routes';
export const getDashboard = (
  token,
  date_init 
) => new Promise((resolve, reject) => {
  fetch(`${URL}/filters/dashboard/?date_init=${date_init}`, {
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