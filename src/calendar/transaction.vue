<template>
  <div class="tag" :class="trans.category">{{ trans.category }}</div>
</template>

<script>
export default {
  name: 'transaction',
  props: ['trans'],
};
</script>

<style lang="css">
</style>
