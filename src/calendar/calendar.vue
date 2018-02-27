<template>
  <div class="calendar">
    <div v-for="day in weekdays">{{ day }}</div>
    <day v-for="day in calData" :day="day"></day>
  </div>
</template>

<script>
import * as calService from './calendar.service';
import Day from './day.vue';
import { events, Event } from './../events';

export default {
  name: 'calendar',
  data() {
    return {
      calData: calService.getCalendar(),
      weekdays: calService.WEEKDAYS,
    }
  },
  created() {
    events.$on(Event.TRANS_LOADED, res => {
      calService.setTransactions(this.calData, res);
    });
  },
  components: {
    Day
  }
}
</script>

<style lang="css">
</style>
