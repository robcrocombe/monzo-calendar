const REDIRECT_URL = encodeURIComponent(window.location.href);
const CLIENT_ID = process.env.CLIENT_ID;
const STATE_TOKEN = process.env.STATE_TOKEN;

export function redirectUrl() {
  return `https://auth.monzo.com/?
    client_id=${CLIENT_ID}
    &redirect_uri=${REDIRECT_URL}
    &response_type=code
    &state=${STATE_TOKEN}`
    .replace(/\s/g, '');
}
