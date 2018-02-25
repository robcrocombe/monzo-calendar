<template>
  <div id="app">
    <calendar></calendar>
  </div>
</template>

<script>
import Calendar from './calendar/calendar.vue';

export default {
  name: 'app',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App!'
    }
  },
  components: {
    Calendar
  }
}
</script>

<style lang="css">

</style>
