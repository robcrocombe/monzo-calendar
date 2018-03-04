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
      <action v-for="t in day.actions" :data="t"></action>
    </div>
  </div>
</template>

<script>
import Action from './action.vue';
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
    Action,
  },
};
</script>

<style lang="css">
</style>
