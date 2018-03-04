<template>
  <div class="box box-date">
    <span :class="{ 'has-text-weight-bold': day.isToday }">{{ title }}</span>
    <button
      v-if="day.isFuture"
      @click="newAction"
      type="button"
      title="Plan a transaction"
      class="button is-white is-small add-action-btn">
      +</button>
    <div>
      <past-action v-for="t in day.actions.past" :data="t"></past-action>
      <planned-action v-for="t in day.actions.planned" :data="t"></planned-action>
    </div>
  </div>
</template>

<script>
import PastAction from './past-action.vue';
import PlannedAction from './planned-action.vue';
import { events, Event } from './../events';

export default {
  name: 'day',
  props: ['day'],
  computed: {
    title() {
      if (this.day.date.date() === 1) {
        return this.day.date.format('D MMM');
      }
      return this.day.date.format('D');
    },
  },
  methods: {
    newAction() {
      events.$emit(Event.START_NEW_ACTION, this.day);
    },
  },
  components: {
    PastAction,
    PlannedAction,
  },
};
</script>

<style lang="css">
</style>
