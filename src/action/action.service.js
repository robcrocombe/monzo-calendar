import { events, Event } from './../events';

const plannedActions = [];
let originalBalance = 0;
let finalBalance = 0;
let currency = '';

export function init() {
  events.$on(Event.BALANCE_LOADED, res => {
    originalBalance = res.balance;
    finalBalance = res.balance;
    currency = res.currency;
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
  console.log(finalBalance / 100);
}

function calculateFinalBalance() {
  finalBalance = originalBalance;

  for (let i = 0; i < plannedActions.length; ++i) {
    finalBalance += plannedActions[i].amount;
  }
}
