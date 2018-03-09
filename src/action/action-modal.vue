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
      <label class="label">Additional dates</label>
      <v-date-picker
        mode="multiple"
        v-model="datePicker.selectedValue"
        :min-page="datePicker.minPage"
        :max-page="datePicker.maxPage"
        popover-visibility="visible"
        nav-visibility="hidden"
        :popover-keep-visible-on-input="true"
        :input-props="datePicker.input"
        @input="dateChanged">
      </v-date-picker>
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
    category: 'general',
  };
}

export default {
  name: 'actionModal',
  data() {
    return {
      visible: false,
      form: defaultFormData(),
      day: null,
      categories: actionService.categories,
      datePicker: {
        input: { class: 'input' },
        minPage: { month: 3, year: 2018 },
        maxPage: { month: 3, year: 2018 },
        selectedValue: [],
      },
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
      if (this.validForm()) {
        this.visible = false;
        actionService.addPlannedAction(this.day, this.form);
        this.form = defaultFormData();
      }
    },
    validForm() {
      return !!(this.form.name && this.form.type && this.form.amount);
    },
    dateChanged() {
      console.log(this.datePicker.selectedValue);
    },
  },
  components: {
    Modal,
  },
};
</script>

<style lang="css">
</style>
