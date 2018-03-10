import * as authService from './auth.service';
import * as calService from './../calendar/calendar.service';
import { events, Event } from './../events';

const BASE_URL = 'https://api.monzo.com';
let sessionToken;
let accountId;
let errored = false;

export function init() {
  sessionToken = localStorage.getItem('session.token');
  accountId = localStorage.getItem('session.accountId');

  if (sessionToken && accountId) {
    initData();
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
        })
        .then(initData);
    } else {
      events.$emit(Event.LOGGED_OUT);
    }
  }
}

function initData() {
  getTransactions()
    .then(res => events.$emit(Event.TRANS_LOADED, res.transactions))
    .catch(handleFetchError);
  getBalance()
    .then(res => events.$emit(Event.BALANCE_LOADED, res))
    .catch(handleFetchError);
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
    before: calService.getEndDate().toISOString(),
  });
}

function getBalance() {
  return get('/balance', {
    account_id: accountId,
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
  }).then(async res => {
    const body = await res.json();

    if (res.ok) {
      return body;
    }

    const err = new Error();
    err.name = body.code || resp.status;
    err.message = body.message || resp.statusText;
    throw err;
  });
}

function handleFetchError(e) {
  console.error(`${e.name}: ${e.message}`);

  if (!errored && e.status === 401) {
    errored = true;
    localStorage.removeItem('session.token');
    localStorage.removeItem('session.accountId');
    events.$emit(Event.LOGGED_OUT);
  }
}

function getQueryString(params) {
  const searchParams = new URLSearchParams();
  for (const prop in params) {
    searchParams.set(prop, params[prop]);
  }
  return searchParams.toString();
}
