<template>
  <div id="app">
    <nav-bar></nav-bar>
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from './calendar/calendar.vue';
import NavBar from './navbar.vue';

import * as authService from './monzo/auth.service';

export default {
  name: 'app',
  created() {
    if (!localStorage.getObject('session.config')) {
      const url = new URL(window.location.href);
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      if (code && state) {
        window.history.replaceState({}, document.title, '/');

        if (state !== process.env.STATE_TOKEN) {
          console.error(`State token '${state}' does not match local token`);
          return;
        }
        authService.getToken(code);
      }
    }
  },
  components: {
    Calendar,
    NavBar
  }
}
</script>

<style lang="css">
</style>
