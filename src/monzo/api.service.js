import * as authService from './auth.service';
import * as calService from './../calendar/calendar.service';
import { Events } from './../events';

const BASE_URL = 'https://api.monzo.com';
let sessionToken;
let accountId;

export function init() {
  sessionToken = localStorage.getItem('session.token');
  accountId = localStorage.getItem('session.accountId');

  if (sessionToken && accountId) {
    // getTransactions();
  } else {
    const stateToken = localStorage.getItem('session.stateToken');
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    localStorage.clear();

    if (code && state && stateToken) {
      window.history.replaceState({}, document.title, '/');

      if (state !== stateToken) {
        console.error(`State parameter '${state}' does not match '${stateToken}'`);
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

function getAccountId() {
  return get('/accounts', {
    account_type: 'uk_retail',
  });
}

function getTransactions() {
  return get('/transactions', {
    account_id: accountId,
    since: calService.getStartDate().toISOString(),
  })
  .then(res => {
    console.log(res);
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
