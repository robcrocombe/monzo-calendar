import currency from 'currency-formatter';
import { events, Event } from './../events';

const plannedActions = [];
let originalBalance = 0;
let finalBalance = 0;

export function init() {
  events.$on(Event.BALANCE_LOADED, res => {
    originalBalance = res.balance;
    finalBalance = res.balance;
  });
}

export function addPlannedAction(day, action) {
  if (action.type === 'debit') {
    action.amount = -action.amount;
  }
  action.amount *= 100;

  day.actions.planned.push(action);
  plannedActions.push(action);
  calculateFinalBalance();
  events.$emit(Event.SAVED_NEW_ACTION, finalBalance);
}

export function formatCurrency(val, code, disableAbs, options) {
  const value = (disableAbs ? val : Math.abs(val)) / 100;
  return currency.format(value, { code, ...options });
}

export const formatCurrencyMixin = {
  methods: {
    formatCurrency,
  },
};

function calculateFinalBalance() {
  finalBalance = originalBalance;

  for (let i = 0; i < plannedActions.length; ++i) {
    finalBalance += plannedActions[i].amount;
  }
}
