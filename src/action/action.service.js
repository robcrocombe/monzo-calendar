import currency from 'currency-formatter';
import moment from 'moment';
import { events, Event } from './../events';
import * as calService from './../calendar/calendar.service';

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

export function addPlannedActions(days, action) {
  let offset = 0;

  for (let i = 0; i < days.length; ++i) {
    offset = calService.findDayIndex(days[i], offset);

    addAction(calService.calendar[offset], action);
  }

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

function addAction(day, action) {
  const isDebit = action.type === 'debit';
  const savedAction = {
    name: action.name,
    category: action.category,
    debit: isDebit,
    amount: (isDebit ? -action.amount : action.amount) * 100,
    created: day.date.toISOString(),
  };

  day.actions.planned.push(savedAction);
  plannedActions[day.index] = plannedActions[day.index] || [];
  plannedActions[day.index].push(savedAction);
}

function initPlannedActions() {
  // Reset if the month has changed
  const cachedMonth = localStorage.getItem('data.month');
  const currentMonth = moment().month();

  if (cachedMonth !== currentMonth) {
    plannedActions = {};
    localStorage.removeItem('data.actions');
    localStorage.setItem('data.month', currentMonth);
    return;
  }

  let actions = localStorage.getObject('data.actions') || {};

  // Remove actions from past days
  actions = filterOldActions(actions);

  localStorage.setObject('data.actions', actions);
  plannedActions = actions;
}

function calculateFinalBalance() {
  finalBalance = originalBalance;

  const days = Object.keys(plannedActions);

  for (let i = 0; i < days.length; ++i) {
    const dayActions = plannedActions[days[i]];

    for (let j = 0; j < dayActions.length; ++j) {
      finalBalance += dayActions[j].amount;
    }
  }
}

function filterOldActions(actions) {
  return Object.keys(actions)
    .filter(key => parseInt(key) >= calService.todayIndex)
    .reduce((obj, key) => {
      obj[key] = actions[key];
      return obj;
    }, {});
}
