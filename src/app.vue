<template>
  <div id="app">
    <nav-bar></nav-bar>
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from './calendar/calendar.vue';
import NavBar from './navbar.vue';

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
