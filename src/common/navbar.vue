<template>
  <nav class="navbar has-shadow is-light">
    <div class="navbar-brand">
      <div class="navbar-item is-size-5 has-text-weight-bold">
        Monzo Calendar
      </div>
    </div>
    <div class="navbar-item">Current Balance:&nbsp;
      <span class="has-text-info">{{ currentBalance }}</span>
    </div>
    <div class="navbar-item">Planned Balance:&nbsp;
      <span class="has-text-info">{{ plannedBalance }}</span>
    </div>
    <div class="navbar-item" title="Profit/Loss">P/L:&nbsp;
      <span :class="{ 'has-text-success': diffAmount > 0, 'has-text-danger': diffAmount < 0 }">{{ diff }}</span>
    </div>
    <div class="navbar-end">
      <div class="navbar-item" v-if="showLoginButton">
        <a
          v-if="hasClientVars"
          class="button is-primary"
          :href="monzoLoginUrl">Login with Monzo</a>
        <button
          v-else
          type="button"
          class="button is-primary"
          @click="openAuthModal">Login with Monzo</button>
      </div>
      <div class="navbar-item" v-else>
        <button type="button" class="button" @click="openLogoutModal">Log out</button>
      </div>
    </div>
    <auth-modal
      :visible="showAuthModal"
      @close="closeAuthModal"
      @submit="saveClientVars">
    </auth-modal>
    <logout-modal
      :visible="showLogoutModal"
      @close="closeLogoutModal"
      @submit="logout">
    </logout-modal>
  </nav>
</template>

<script>
import * as authService from './../monzo/auth.service';
import AuthModal from './auth-modal.vue';
import LogoutModal from './logout-modal.vue';
import { events, Event } from './../events';

export default {
  name: 'navBar',
  data() {
    return {
      showLoginButton: false,
      showAuthModal: false,
      showLogoutModal: false,
      account: {
        balance: 0,
      },
      newBalance: 0,
      diffAmount: 0,
    };
  },
  computed: {
    monzoLoginUrl() {
      return authService.loginUrl();
    },
    currentBalance() {
      return this.formatCurrency(this.account.balance, this.account.currency);
    },
    plannedBalance() {
      return this.formatCurrency(this.newBalance, this.account.currency);
    },
    diff() {
      this.diffAmount = this.newBalance - this.account.balance;
      return this.formatCurrency(this.diffAmount, this.account.currency, true, { symbol: '' });
    },
    hasClientVars() {
      return authService.hasClientVars();
    },
  },
  created() {
    events.$on(Event.LOGGED_OUT, () => {
      this.showLoginButton = true;
    });

    events.$on(Event.BALANCE_LOADED, res => {
      this.account = res;
      this.newBalance = res.balance;
    });

    events.$on(Event.NEW_FINAL_BALANCE, newBalance => {
      this.newBalance = newBalance;
    });
  },
  methods: {
    logout() {
      localStorage.clear();
      location.reload();
    },
    saveClientVars(form) {
      authService.setClientVars(form.clientId, form.clientSecret);
      window.location.href = authService.loginUrl();
    },
    openAuthModal() {
      this.showAuthModal = true;
    },
    closeAuthModal() {
      this.showAuthModal = false;
    },
    openLogoutModal() {
      this.showLogoutModal = true;
    },
    closeLogoutModal() {
      this.showLogoutModal = false;
    },
  },
  components: {
    AuthModal,
    LogoutModal,
  },
};
</script>
