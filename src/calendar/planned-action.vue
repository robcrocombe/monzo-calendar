<template>
  <div class="tag">
    <span>{{ data.name }}</span>
    <span>{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'plannedAction',
  props: ['data'],
  computed: {
    amount() {
      return this.formatCurrency(this.data.amount, 'GBP');
    },
  },
};
</script>

<style lang="css">
</style>
