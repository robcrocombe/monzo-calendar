import * as authService from './auth.service';
import { Events } from './../events';

const BASE_URL = 'https://api.monzo.com';
let sessionToken;
let accountId;

export function init() {
  sessionToken = localStorage.getItem('session.token');
  accountId = localStorage.getItem('session.accountId');

  if (sessionToken && accountId) {
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

      authService
        .getToken(code)
        .then(res => {
          sessionToken = res.access_token;
          localStorage.setItem('session.token', sessionToken);
        })
        .then(getAccountId)
        .then(res => {
          accountId = res.accounts[0].id;
          localStorage.setItem('session.accountId', accountId);
        });
    } else {
      Events.$emit('logged-out');
    }
  }
}

export function getAccountId() {
  return get('/accounts', {
    account_type: 'uk_retail',
  });
}

function get(url, params) {
  if (params) {
    url += '?' + getQueryString(params);
  }

  return fetch(BASE_URL + url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${sessionToken}`,
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
