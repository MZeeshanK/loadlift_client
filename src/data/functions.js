import moment from 'moment';

export const formattedDate = date => {
  const now = moment();
  const duration = moment.duration(now.diff(date));

  const days = duration.days();
  const minutes = duration.minutes();
  const hours = duration.hours();

  const newDate = moment(date).format('MMMM DD, YYYY');
  if (days > 0) return newDate;

  if (hours > 1) return `${hours} hrs ago`;

  if (hours > 0) return `${hours} hr ago`;

  if (minutes > 0) return `${minutes} min ago`;

  return 'now';
};
