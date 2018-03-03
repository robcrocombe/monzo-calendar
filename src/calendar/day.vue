<template>
  <div class="box box-date">
    <span v-bind:class="{ 'has-text-weight-bold': day.isToday }">{{ title }}</span>
    <button
      v-if="day.isFuture"
      v-on:click="newTrans"
      type="button"
      class="button is-white is-small add-trans-btn">
      +</button>
    <div>
      <transaction v-for="t in day.trans" :trans="t"></transaction>
    </div>
  </div>
</template>

<script>
import Transaction from './transaction.vue';

export default {
  name: 'day',
  props: ['day'],
  data() {
    return {
      newTransOpen: false,
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
    newTrans() {
      this.newTransOpen = true;
    },
  },
  components: {
    Transaction,
  },
};
</script>

<style lang="css">
</style>
