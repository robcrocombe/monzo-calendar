<template>
  <div class="tag" :class="data.category">
    <span class="truncate">{{ data.category }}</span>
    <span>{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'pastAction',
  props: ['data'],
  computed: {
    amount() {
      const value = this.formatCurrency(this.data.amount, this.data.currency);
      if (this.data.amount > 0) {
        return `+${value}`;
      }
      return value;
    },
  },
};
</script>

<style lang="css">
</style>
