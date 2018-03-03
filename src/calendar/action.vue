<template>
  <div class="tag" :class="data.category">{{ data.category }}</div>
</template>

<script>
export default {
  name: 'action',
  props: ['data'],
};
</script>

<style lang="css">
</style>
