<template>
  <modal :title="'Plan a new transaction'" :visible="visible" @close="close">
    <div class="field">
      <label class="label" for="name">Name</label>
      <div class="control">
        <input class="input" type="text" name="name" ref="name" v-model="form.name">
      </div>
    </div>
    <div class="field">
      <label class="label" for="type">Type</label>
      <div class="control">
        <label class="radio">
          <input type="radio" name="type" v-model="form.type" :value="'debit'">
          Debit
        </label>
        <label class="radio">
          <input type="radio" name="type" v-model="form.type" :value="'credit'">
          Credit
        </label>
      </div>
    </div>
    <div class="field">
      <label class="label" for="name">Amount</label>
      <div class="control">
        <input class="input" type="number" name="amount" step="0.01" min="0.01" v-model="form.amount">
      </div>
    </div>

    <div slot="footer">
      <button class="button is-success" @click="save">Save</button>
      <button class="button" @click="close">Cancel</button>
    </div>
  </modal>
</template>

<script>
import Modal from './../modal.vue';
import { events, Event } from './../events';
import * as actionService from './action.service';

function defaultFormData() {
  return {
    name: '',
    type: 'debit',
    amount: '1.00',
  };
}

export default {
  name: 'actionModal',
  data() {
    return {
      visible: false,
      form: defaultFormData(),
      day: null,
    };
  },
  created() {
    events.$on(Event.START_NEW_ACTION, day => {
      this.visible = true;
      this.day = day;
      this.$nextTick(() => this.$refs.name && this.$refs.name.focus());
    });
  },
  methods: {
    close() {
      this.visible = false;
      this.form = defaultFormData();
    },
    save() {
      this.visible = false;
      actionService.addPlannedAction(this.day, this.form);
      this.form = defaultFormData();
    },
  },
  components: {
    Modal,
  },
};
</script>

<style lang="css">
</style>
