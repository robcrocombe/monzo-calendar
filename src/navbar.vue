<template>
  <nav class="navbar has-shadow is-light">
    <div class="navbar-brand">
      <div class="navbar-item is-size-5 has-text-weight-bold">
        Monzo Calendar
      </div>
    </div>
    <div class="navbar-item">Balance: {{ uiBalance }}</div>
    <div class="navbar-end">
      <div class="navbar-item" v-if="showLoginButton">
        <a class="button is-primary" v-bind:href="monzoLoginUrl">Login with Monzo</a>
      </div>
      <div class="navbar-item" v-else>
        <button type="button" class="button" v-on:click="logout">Log out</button>
      </div>
    </div>
  </nav>
</template>

<script>
import currency from 'currency-formatter';

import * as authService from './monzo/auth.service';
import { events, Event } from './events';

export default {
  name: 'navBar',
  data() {
    return {
      showLoginButton: false,
      account: {
        balance: 0,
      },
    };
  },
  computed: {
    monzoLoginUrl() {
      return authService.loginUrl();
    },
    uiBalance() {
      return currency.format(this.account.balance / 100, { code: this.account.currency });
    },
  },
  created() {
    events.$on(Event.LOGGED_OUT, () => {
      this.showLoginButton = true;
    });

    events.$on(Event.BALANCE_LOADED, res => {
      this.account = res;
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      location.reload();
    },
  },
};
</script>
