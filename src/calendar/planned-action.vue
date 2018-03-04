<template>
  <div class="tag future">
    <span class="truncate">{{ data.name }}</span>
    <span>{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'plannedAction',
  props: ['data'],
  computed: {
    amount() {
      const value = this.formatCurrency(this.data.amount, 'GBP');
      if (this.data.type === 'credit') {
        return `+${value}`;
      }
      return value;
    },
  },
};
</script>

<style lang="css">
</style>
