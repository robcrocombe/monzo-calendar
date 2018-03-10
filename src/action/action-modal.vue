<template>
  <modal :title="'Plan a new transaction'" :visible="visible" @close="close">
    <div @keydown.enter="save">
      <div class="field">
        <label class="label" for="name">Name</label>
        <div class="control">
          <input class="input" type="text" name="name" ref="name" v-model.trim="form.name">
        </div>
      </div>
      <div class="columns">
        <div class="column is-one-third">
          <label class="label" for="category">Category</label>
          <div class="select">
            <select name="category" v-model="form.category">
              <option v-for="cat in categories" v-bind:value="cat.value">
                {{ cat.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="column">
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
      </div>
      <div class="field">
        <label class="label" for="name">Amount</label>
        <div class="control">
          <input class="input" type="number" name="amount" step="0.01" min="0.01" v-model.number="form.amount">
        </div>
      </div>
    </div>

    <div class="model-custom-date my2">
      <label class="label">Select dates</label>
      <v-date-picker
        mode="multiple"
        v-model="datePicker.selected"
        popover-visibility="visible"
        nav-visibility="hidden"
        :min-date="datePicker.minDate"
        :max-date="datePicker.maxDate"
        :popover-keep-visible-on-input="true"
        :input-props="datePicker.input">
      </v-date-picker>
    </div>

    <div slot="footer">
      <button class="button is-success" @click="save">Save</button>
      <button class="button" @click="close">Cancel</button>
    </div>
  </modal>
</template>

<script>
import moment from 'moment';
import Modal from './../common/modal.vue';
import { events, Event } from './../events';
import * as actionService from './action.service';

function defaultFormData() {
  return {
    name: '',
    type: 'debit',
    amount: '1.00',
    category: 'general',
  };
}

export default {
  name: 'actionModal',
  data() {
    return {
      visible: false,
      form: defaultFormData(),
      categories: actionService.categories,
      datePicker: {
        input: { class: 'input' },
        minDate: null,
        maxDate: null,
        selected: [],
      },
    };
  },
  created() {
    events.$on(Event.START_NEW_ACTION, day => {
      const now = moment();

      this.visible = true;
      this.datePicker.selected = [day.date.toDate()];
      this.datePicker.minDate = now
        .clone()
        .startOf('month')
        .toDate();
      this.datePicker.maxDate = now
        .clone()
        .endOf('month')
        .toDate();
      this.$nextTick(() => this.$refs.name && this.$refs.name.focus());
    });
  },
  methods: {
    close() {
      this.visible = false;
      this.form = defaultFormData();
    },
    save() {
      if (this.validForm()) {
        this.visible = false;
        actionService.addPlannedActions(this.datePicker.selected, this.form);
        this.form = defaultFormData();
      }
    },
    validForm() {
      return !!(this.form.name && this.form.type && this.form.amount);
    },
  },
  components: {
    Modal,
  },
};
</script>

<style lang="css">
</style>
