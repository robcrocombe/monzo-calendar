<template>
  <div class="modal" :class="{ 'is-active': visible }">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" aria-label="close" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: ['title', 'visible'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="css">
</style>
