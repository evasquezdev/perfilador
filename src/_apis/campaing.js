import URL from './routes';


export const fetchCampaing = (
  token,
) => new Promise((resolve, reject) => {
  fetch(`${URL}/campaign/my_email_campaigns/`, {
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

export const fetchCampaingSMS = (
  token,
) => new Promise((resolve, reject) => {
  fetch(`${URL}/campaign/my_sms_campaigns/`, {
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
  fetch(`${URL}/filters/email_dashboard/?campaign=${id}`, {
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

export const getCampaingSMS = (
  token,
  id
) => new Promise((resolve, reject) => {
  fetch(`${URL}/filters/sms_dashboard/?campaign=${id}`, {
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

export const getCampaingSMSFILE = (
  token,
  id
) => new Promise((resolve, reject) => {
  let idFILE = id.toString();
  fetch(`${URL}/campaign/get_data_sms_campaigns/?campaigns=${idFILE}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    }
  }).then((res) => {
    return res.blob();
})
.then((blob) => {
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'Datos.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch((error) => reject(error));
});

export const getCampaingFILE = (
  token,
  id
) => new Promise((resolve, reject) => {
  let idFILE = id.toString();
  fetch(`${URL}/campaign/get_data_email_campaigns/?campaigns=${idFILE}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    }
  }).then((res) => {
    return res.blob();
})
.then((blob) => {
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'Datos.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch((error) => reject(error));
});


export const getCampaingFILEANALITIC = (
  token,
  id
) => new Promise((resolve, reject) => {
  let idFILE = id.toString();
  fetch(`${URL}/campaign/get_data_email_campaigns/?campaigns=${idFILE}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    }
  }).then((res) => {
    return res.blob();
})
.then((blob) => {
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'Datos.xlsx'); //or any other extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch((error) => reject(error));
});