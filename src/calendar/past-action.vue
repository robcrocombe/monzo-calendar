<template>
  <div class="tag" :class="data.category">
    <span>{{ data.category }}</span>
    <span>{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'pastAction',
  props: ['data'],
  computed: {
    amount() {
      return this.formatCurrency(this.data.amount, this.data.currency);
    },
  },
};
</script>

<style lang="css">
</style>
