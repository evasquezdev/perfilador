import URL from './routes';
export const getDashboard = (
  token
) => new Promise((resolve, reject) => {
  fetch(`${URL}/filters/dashboard/`, {
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