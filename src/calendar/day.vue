<template>
  <!-- Day -->
  <div class="box box-date" v-bind:class="{ 'has-text-weight-bold': day.isToday }">{{ title }}</div>
</template>

<script>
export default {
  name: 'day',
  props: ['day'],
  computed: {
    title() {
      if (this.day.date.date() === 1) {
        return this.day.date.format('D MMM');
      }
      return this.day.date.format('D');
    }
  },
};
</script>

<style lang="css">
</style>
