<template>
  <modal :title="'Plan a new transaction'" :visible="visible" @close="close">
    <div class="content">
      <p>Hello world!</p>
    </div>

    <div slot="footer">
      <button class="button is-success">Save</button>
      <button class="button" @click="close">Cancel</button>
    </div>
  </modal>
</template>

<script>
import Modal from './../modal.vue';
import { events, Event } from './../events';

export default {
  name: 'actionModal',
  data() {
    return {
      visible: false,
    };
  },
  created() {
    events.$on(Event.START_NEW_ACTION, day => {
      console.log('clicked', day);
      this.visible = true;
    });
  },
  methods: {
    close() {
      this.visible = false;
    },
  },
  components: {
    Modal,
  },
};
</script>

<style lang="css">
</style>
