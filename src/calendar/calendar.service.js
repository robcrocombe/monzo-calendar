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
let calendar = [];
let offsetMonth = 0;

export function initCalendar() {
  const now = moment();

  startDate = getStartDate(now);
  endDate = getEndDate(now);

  for (let m = startDate.clone(); m.isBefore(endDate); m.add(1, 'days')) {
    calendar.push(getDayObject(m, now));
  }

  return calendar;
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

export function setActions(actions, type) {
  if (!actions.length) return;

  let offset = 0;

  for (let i = 0; i < actions.length; ++i) {
    offset = findDayIndex(actions[i].created, offset);
    calendar[offset].actions[type].push(actions[i]);
  }
}

function getDayObject(day, now) {
  const date = day.clone();

  return {
    date,
    isToday: date.isSame(now, 'day'),
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

function findDayIndex(date, offset) {
  const momentDate = moment(date);

  for (let i = offset; i < calendar.length; ++i) {
    if (calendar[i].date.isSame(momentDate, 'day')) {
      return i;
    }
  }
  return 0;
}
