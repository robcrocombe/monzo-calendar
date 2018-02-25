<template>
  <nav class="navbar has-shadow is-light">
    <div class="navbar-brand">
      <div class="navbar-item is-size-5 has-text-weight-bold">
        Monzo Calendar
      </div>
    </div>
    <div class="navbar-end" v-if="showLoginButton">
      <div class="navbar-item">
        <a type="button" class="button is-primary" v-bind:href="monzoLoginUrl">Login with Monzo</a>
      </div>
    </div>
  </nav>
</template>

<script>
import * as authService from './monzo/auth.service';
import { Events } from './events';

export default {
  name: 'navBar',
  data() {
    return {
      showLoginButton: false,
    };
  },
  computed: {
    monzoLoginUrl() {
      return authService.loginUrl();
    },
  },
  created() {
    Events.$on('logged-out', () => {
      this.showLoginButton = true;
    });
  },
};
</script>
