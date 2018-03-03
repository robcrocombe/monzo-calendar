<template>
  <div class="box box-date">
    <span v-bind:class="{ 'has-text-weight-bold': day.isToday }">{{ title }}</span>
    <button
      v-if="day.isFuture"
      v-on:click="newAction"
      type="button"
      class="button is-white is-small add-action-btn">
      +</button>
    <div>
      <action v-for="t in day.actions" :data="t"></action>
    </div>
  </div>
</template>

<script>
import Action from './action.vue';

export default {
  name: 'day',
  props: ['day'],
  data() {
    return {
      newActionOpen: false,
    };
  },
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
      this.newActionOpen = true;
    },
  },
  components: {
    Action,
  },
};
</script>

<style lang="css">
</style>
