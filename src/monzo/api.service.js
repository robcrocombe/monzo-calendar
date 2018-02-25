import * as authService from './auth.service';
import { Events } from './../events';

const BASE_URL = 'https://api.monzo.com';
let session;

export function init() {
  session = localStorage.getObject('session.config');

  if (session) {
    get('/accounts', {
      account_type: 'uk_retail',
    }).then(res => {
      console.log(res);
    });
  } else {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code && state) {
      window.history.replaceState({}, document.title, '/');

      if (state !== process.env.STATE_TOKEN) {
        console.error(`State token '${state}' does not match local token`);
        return;
      }

      authService.getToken(code).then(data => {
        localStorage.setObject('session.config', data);
      });
    } else {
      Events.$emit('logged-out');
    }
  }
}

function get(url, params) {
  if (params) {
    url += '?' + getQueryString(params);
  }

  return fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${session.access_token}`,
    },
  }).then(resp => resp.json());
}

function getQueryString(params) {
  const searchParams = new URLSearchParams();
  for (const prop in params) {
    searchParams.set(prop, params[prop]);
  }
  return searchParams.toString();
}
