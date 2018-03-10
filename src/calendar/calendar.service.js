import moment from 'moment';

export const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

let startDate;
let endDate;
let offsetMonth = 0;
export let calendar = [];
export let todayIndex;

export function init() {
  const now = moment();

  startDate = getStartDate(now);
  endDate = getEndDate(now);

  for (let m = startDate.clone(); m.isBefore(endDate); m.add(1, 'days')) {
    calendar.push(getDayObject(m, now, calendar.length));
  }
}

export function getStartDate(now) {
  if (!now) return startDate;

  const startOfMonth = now.clone().startOf('month');
  return startOfMonth
    .subtract(offsetMonth, 'month')
    .subtract(startOfMonth.isoWeekday() - 1, 'days');
}

export function getEndDate(now) {
  if (!now) return endDate;

  const endOfMonth = now.clone().endOf('month');
  return endOfMonth.subtract(offsetMonth, 'month').add(7 - endOfMonth.isoWeekday(), 'days');
}

export function setPastActions(actions) {
  if (!actions.length) return;

  let offset = 0;

  for (let i = 0; i < actions.length; ++i) {
    offset = findDayIndex(actions[i].created, offset);
    calendar[offset].actions.past.push(actions[i]);
  }
}

export function setPlannedActions(actions) {
  const keys = Object.keys(actions);

  for (let i = 0; i < keys.length; ++i) {
    const date = parseInt(keys[i]);
    calendar[date].actions.planned = actions[keys[i]];
  }
}

export function findDayIndex(date, offset) {
  const momentDate = moment(date);

  for (let i = offset; i < calendar.length; ++i) {
    if (calendar[i].date.isSame(momentDate, 'day')) {
      return i;
    }
  }
  return 0;
}

function getDayObject(day, now, index) {
  const date = day.clone();
  const isToday = date.isSame(now, 'day');

  if (isToday) {
    todayIndex = index;
  }

  return {
    date,
    index,
    isToday,
    isCurrentMonth: date.isSame(now, 'month'),
    isWeekend: date.isoWeekday() > 5,
    isFuture: date.isSameOrAfter(now, 'day'),
    weekDay: date.isoWeekday(),
    actions: {
      past: [],
      planned: [],
    },
  };
}
