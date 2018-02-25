<template>
  <div id="app">
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
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from './calendar/calendar.vue';
import * as authService from './monzo/auth.service';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App!'
    }
  },
  computed: {
    monzoAuthUrl() {
      return authService.redirectUrl();
    }
  },
  components: {
    Calendar
  }
}
</script>

<style lang="css">

</style>
