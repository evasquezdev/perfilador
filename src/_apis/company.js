import URL from './routes';


export const fetchCompany = (
  token,
) => new Promise((resolve, reject) => {
  fetch(`${URL}/company/`, {
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

export const postCompany = (
  token,
  name,
  smsQuantity,
  emailQuantity,
  price_per_email,
  price_per_sms
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  dbData.append('name', name);
  dbData.append('quantity_of_sms', smsQuantity);
  dbData.append('quantity_of_emails', emailQuantity);
  dbData.append('price_per_email', price_per_email);
  dbData.append('price_per_sms', price_per_sms);
  fetch(`${URL}/company/`, {
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

export const deleteCompany = (
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

export const patchCompany = (
  token,
  id,
  name,
  smsQuantity,
  emailQuantity,
  price_per_email,
  price_per_sms
) => new Promise((resolve, reject) => {
  let dbData = new FormData();
  dbData.append('name', name);
  dbData.append('quantity_of_sms', smsQuantity);
  dbData.append('quantity_of_emails', emailQuantity);
  dbData.append('price_per_email', price_per_email);
  dbData.append('price_per_sms', price_per_sms);

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