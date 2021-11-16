import URL from './routes';


export const fetchUser = (
  token,
) => new Promise((resolve, reject) => {
  fetch(`${URL}/user/get_users/`, {
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

export const postUser = (
  token,
  name,
  email,
  password,
  company
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  dbData.append('name', name);
  dbData.append('email', email);
  dbData.append('password', password);
  dbData.append('company', company);
  fetch(`${URL}/user/create_user/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: dbData
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});

export const deleteUser = (
  token,
  id
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  fetch(`${URL}/company/${id}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: dbData
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});

export const patchUser = (
  token,
  id,
  name,
  company
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  dbData.append('name', name);
  dbData.append('company', company);

  fetch(`${URL}/company/${id}/`, {
    method: 'PATCH',
    headers: {
      Authorization: `Token ${token}`,
    },
    body: dbData
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});