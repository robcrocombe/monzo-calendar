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

export function getCalendar() {
  const now = moment();
  const calendar = [];

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
  return startOfMonth.subtract(startOfMonth.isoWeekday() - 1, 'days');
}

export function getEndDate(now) {
  if (!now) return endDate;

  const endOfMonth = now.clone().endOf('month');
  return endOfMonth.add(7 - endOfMonth.isoWeekday(), 'days');
}

function getDayObject(day, now) {
  const date = day.clone();

  return {
    isToday: date.isSame(now, 'day'),
    isCurrentMonth: date.isSame(now, 'month'),
    weekDay: date.isoWeekday(),
    isWeekend: date.isoWeekday() > 5,
    date,
    events: {},
  };
}
