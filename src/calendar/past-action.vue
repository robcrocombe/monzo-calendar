<template>
  <div class="tag" :class="data.category">{{ data.category }} {{ amount }}</div>
</template>

<script>
import currency from 'currency-formatter';

export default {
  name: 'pastAction',
  props: ['data'],
  computed: {
    amount() {
      return currency.format(this.data.amount / 100, { code: this.data.currency });
    },
  },
};
</script>

<style lang="css">
</style>
