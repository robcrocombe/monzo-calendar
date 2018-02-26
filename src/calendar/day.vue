<template>
  <div class="box box-date" v-bind:class="{ 'has-text-weight-bold': day.isToday }">
    <span>{{ title }}</span>
    <transaction></transaction>
  </div>
</template>

<script>
import Transaction from './transaction.vue';

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
  components: {
    Transaction,
  },
};
</script>

<style lang="css">
</style>
