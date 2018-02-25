const REDIRECT_URL = 'http://localhost:1234/';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const STATE_TOKEN = process.env.STATE_TOKEN;

export function redirectUrl() {
  return `https://auth.monzo.com/?
    client_id=${CLIENT_ID}
    &redirect_uri=${REDIRECT_URL}
    &response_type=code
    &state=${STATE_TOKEN}`.replace(/\s/g, '');
}

export function getToken(authCode) {
  const formData = getFormData({
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URL,
    code: authCode,
  });

  return fetch('https://api.monzo.com/oauth2/token', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }).then(res => {
    console.log(res);
    console.log(res.json());
  });
}

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
}
