import currency from 'currency-formatter';
import moment from 'moment';
import { events, Event } from './../events';

export let plannedActions;
let originalBalance = 0;
let finalBalance = 0;

export function init() {
  plannedActions = localStorage.getObject('data.actions') || [];
  filterOldActions();

  events.$on(Event.BALANCE_LOADED, res => {
    originalBalance = res.balance;
    finalBalance = res.balance;
  });
}

export function addPlannedAction(day, action) {
  const isDebit = action.type === 'debit';
  const savedAction = {
    name: action.name,
    debit: isDebit,
    amount: (isDebit ? -action.amount : action.amount) * 100,
    created: day.date.toISOString(),
  };

  day.actions.planned.push(savedAction);
  plannedActions.push(savedAction);
  calculateFinalBalance();

  localStorage.setObject('data.actions', plannedActions);

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

function filterOldActions() {
  if (!plannedActions.length) return;
  const now = moment().startOf('day');

  plannedActions = plannedActions.filter(action => {
    return moment(action.created).isSameOrAfter(now, 'day');
  });
}
