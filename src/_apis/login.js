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

export const doForgot = (
  email,
) => new Promise((resolve, reject) => {
  const data = new FormData();
  email && data.append('email', email);
  fetch(`${URL}/user/forgotPassword/`, {
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

export const doConfirm = (
  email,
  token
) => new Promise((resolve, reject) => {
  const data = new FormData();
  email && data.append('email', email);
  email && data.append('token', token);
  fetch(`${URL}/user/confirmToken/`, {
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

export const doReset = (
  email,
  token
) => new Promise((resolve, reject) => {
  const data = new FormData();
  email && data.append('user_identification', email);
  email && data.append('user_new_token', token);
  fetch(`${URL}/user/resetPassword/`, {
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