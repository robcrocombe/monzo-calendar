<template>
  <div class="calendar">
    <div v-for="day in weekdays">{{ day }}</div>
    <day v-for="day in calData" :day="day"></day>
  </div>
</template>

<script>
import * as calService from './calendar.service';
import Day from './day.vue';

export default {
  name: 'calendar',
  data() {
    return {
      calData: calService.getCalendar(),
      weekdays: calService.WEEKDAYS,
    }
  },
  components: {
    Day
  }
}
</script>

<style lang="css">
</style>
