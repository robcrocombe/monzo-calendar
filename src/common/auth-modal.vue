<template>
  <modal title="Login" :visible="visible" @close="close">
    <div>
      <div class="content">
        <p>You will need to create an OAuth client (non-confidential) in the <a href="https://developers.monzo.com">Monzo developer tools</a> to use this app.</p>
        <p>Use <code>{{ redirectUrl }}</code> as the Redirect URL.</p>
      </div>
      <div class="field mt2">
        <label class="label" for="clientId">Client ID</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="clientId"
            ref="clientId"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-model.trim="form.clientId">
        </div>
      </div>
      <div class="field mb2">
        <label class="label" for="clientSecret">Client Secret</label>
        <div class="control">
          <input
            class="input"
            type="text"
            name="clientSecret"
            ref="clientSecret"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            v-model.trim="form.clientSecret">
        </div>
      </div>
    </div>

    <div slot="footer">
      <button class="button is-primary" @click="submit" :disabled="!validForm">Login</button>
      <button class="button" @click="close">Cancel</button>
    </div>
  </modal>
</template>

<script>
import Modal from './../common/modal.vue';

export default {
  name: 'authModal',
  props: ['visible'],
  data() {
    return {
      form: {
        clientId: '',
        clientSecret: '',
      },
    };
  },
  computed: {
    validForm() {
      return !!(this.form.clientId && this.form.clientSecret);
    },
    redirectUrl() {
      return process.env.REDIRECT_URL;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submit() {
      this.$emit('submit', this.form);
    },
  },
  components: {
    Modal,
  },
};
</script>

<style lang="css">
</style>
