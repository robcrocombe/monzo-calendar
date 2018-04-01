<template>
  <div id="app" class="flex flex-column">
    <main>
      <nav-bar></nav-bar>
      <calendar></calendar>
    </main>
    <footer>
      <div class="has-text-centered">
        <a id="gh-link" class="button is-white" href="https://github.com/robcrocombe/monzo-calendar" target="_blank">
          <span>github.com/robcrocombe/<strong>monzo-calendar</strong></span>
        </a>
      </div>
    </footer>
  </div>
</template>

<script>
import Calendar from './calendar/calendar.vue';
import NavBar from './common/navbar.vue';

import * as apiService from './monzo/api.service';
import * as actionService from './action/action.service';
import * as calService from './calendar/calendar.service';

export default {
  name: 'app',
  created() {
    calService.init();
  },
  mounted() {
    apiService.init();
    actionService.init();
  },
  components: {
    Calendar,
    NavBar,
  },
};
</script>

<style lang="css">
</style>
