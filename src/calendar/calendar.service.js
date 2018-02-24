import moment from 'moment';

export function getCalendar() {
  const now = moment();
  const startDate = getStartDate(now);
  const endDate = getEndDate(now);
  const calendar = [];

  for (let m = startDate.clone(); m.isBefore(endDate); m.add(1, 'days')) {
    calendar.push(getDayObject(m, now));
  }

  console.log(calendar);

  return 'hi';
}

function getStartDate(now) {
  const startOfMonth = now.clone().startOf('month');
  return startOfMonth.subtract(startOfMonth.isoWeekday() - 1, 'days');
}

function getEndDate(now) {
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
