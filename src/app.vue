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

export default {
  name: 'app',
  mounted() {
    apiService.init();
  },
  components: {
    Calendar,
    NavBar,
  },
};
</script>

<style lang="css">
</style>
