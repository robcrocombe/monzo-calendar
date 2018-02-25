<template>
  <nav class="navbar has-shadow is-light">
    <div class="navbar-brand">
      <div class="navbar-item is-size-5 has-text-weight-bold">
        Monzo Calendar
      </div>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <a type="button" class="button is-primary" v-bind:href="monzoAuthUrl">Auth with Monzo</a>
      </div>
    </div>
  </nav>
</template>

<script>
import * as authService from './monzo/auth.service';

export default {
  name: 'navBar',
  computed: {
    monzoAuthUrl() {
      return authService.redirectUrl();
    }
  },
}
</script>
