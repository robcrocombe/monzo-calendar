<template>
  <div>
    <div class="calendar">
      <div v-for="day in weekdays">{{ day }}</div>
      <day v-for="day in calData" :day="day" :add-disabled="addDisabled"></day>
    </div>
    <action-modal></action-modal>
  </div>
</template>

<script>
import * as calService from './calendar.service';
import * as actionService from './../action/action.service';
import Day from './day.vue';
import ActionModal from './../action/action-modal.vue';
import { events, Event } from './../events';

export default {
  name: 'calendar',
  data() {
    return {
      calData: calService.calendar,
      weekdays: calService.WEEKDAYS,
      addDisabled: true,
    };
  },
  created() {
    events.$on(Event.TRANS_LOADED, res => {
      calService.setPastActions(res);
      calService.setPlannedActions(actionService.plannedActions);
      this.addDisabled = false;
    });
  },
  components: {
    Day,
    ActionModal,
  },
};
</script>

<style lang="css">
</style>
