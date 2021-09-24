import URL from './routes';

export const getdbs = (
  token
) => new Promise((resolve, reject) => {
  fetch(`${URL}/databases/`, {
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

export const postdb = (
  token,
  file,
  name,
  abbreviation,
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  dbData.append('file',file);
  dbData.append('name',name);
  dbData.append('abbreviation',abbreviation);
  fetch(`${URL}/databases/`, {
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

export const syncdb = (
  token,
  database
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  dbData.append('database',database);
  fetch(`${URL}/databases/parse_file/`, {
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

export const deletedb = (
  token,
  database
) => new Promise((resolve, reject) => {
  fetch(`${URL}/databases/${database}/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  }).then((resultado) => {
    if (resultado.ok) {
      resultado.json().then((res) => resolve(res));
    } else {
      reject("error");
    }
  }).catch((error) => reject(error));
});