import URL from './routes';

export const doSignIn = (
  email,
  password
) => new Promise((resolve, reject) => {
  const data = new FormData();
  email && data.append('email', email);
  password && data.append('password', password);
  fetch(`${URL}/user/signin/`, {
    method: 'POST',
    body: data,
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});