<template>
  <!-- Day -->
  <div>{{ date.date.toString() }}</div>
</template>

<script>
export default {
  name: 'day',
  props: ['date'],
  data() {
    return {
      msg: '',
    };
  },
};
</script>

<style lang="css">
</style>
