<template>
  <div class="box box-date">
    <span v-bind:class="{ 'has-text-weight-bold': day.isToday }">{{ title }}</span>
    <transaction v-for="t in day.trans" :trans="t"></transaction>
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
