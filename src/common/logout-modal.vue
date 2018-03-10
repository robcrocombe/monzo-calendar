<template>
  <modal title="Are you sure?" :visible="visible" @close="close">
    <div class="content">
      <p>Logging out will remove all saved data.</p>
    </div>

    <div slot="footer">
      <button class="button is-primary" @click="submit">Log out</button>
      <button class="button" @click="close">Cancel</button>
    </div>
  </modal>
</template>

<script>
import Modal from './../common/modal.vue';

export default {
  name: 'logoutModal',
  props: ['visible'],
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('submit');
    },
  },
  components: {
    Modal,
  },
};
</script>

<style lang="css">
</style>
