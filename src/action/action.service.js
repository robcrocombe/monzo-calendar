import currency from 'currency-formatter';
import moment from 'moment';
import { events, Event } from './../events';

export const categories = [
  { value: 'bills', label: 'Bills' },
  { value: 'cash', label: 'Cash out' },
  { value: 'eating_out', label: 'Eating out' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'expenses', label: 'Expenses' },
  { value: 'general', label: 'General' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'holidays', label: 'Holidays' },
  { value: 'mondo', label: 'Top-up' },
  { value: 'transport', label: 'Transport' },
  { value: 'shopping', label: 'Shopping' },
];
export let plannedActions;
let originalBalance = 0;
let finalBalance = 0;

export function init() {
  initPlannedActions();

  events.$on(Event.BALANCE_LOADED, res => {
    originalBalance = res.balance;
    refreshFinalBalance();
  });
}

export function addPlannedAction(day, action) {
  const isDebit = action.type === 'debit';
  const savedAction = {
    name: action.name,
    category: action.category,
    debit: isDebit,
    amount: (isDebit ? -action.amount : action.amount) * 100,
    created: day.date.toISOString(),
  };

  day.actions.planned.push(savedAction);
  insertAction(savedAction, day);

  localStorage.setObject('data.actions', plannedActions);

  refreshFinalBalance();
}

export function refreshFinalBalance() {
  calculateFinalBalance();
  events.$emit(Event.NEW_FINAL_BALANCE, finalBalance);
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

function initPlannedActions() {
  let actions = localStorage.getObject('data.actions') || [];
  const cachedLength = actions.length;

  actions = filterOldActions(actions);

  if (actions.length !== cachedLength) {
    localStorage.setObject('data.actions', actions);
  }

  plannedActions = actions;
}

function insertAction(action, day) {
  for (let i = plannedActions.length - 1; i >= 0; --i) {
    const current = plannedActions[i];

    if (moment(current.created).isSameOrBefore(day.date, 'day')) {
      plannedActions.splice(i + 1, 0, action);
      return;
    }
  }
  plannedActions.splice(0, 0, action);
}

function calculateFinalBalance() {
  finalBalance = originalBalance;

  for (let i = 0; i < plannedActions.length; ++i) {
    finalBalance += plannedActions[i].amount;
  }
}

function filterOldActions(actions) {
  if (!actions.length) return actions;
  const now = moment().startOf('day');

  return actions.filter(action => {
    return moment(action.created).isSameOrAfter(now, 'day');
  });
}
