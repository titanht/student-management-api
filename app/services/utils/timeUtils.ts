import moment from 'moment';

export const betweenTime = (
  time: string,
  startTime: string,
  endTime: string
) => {
  const timeMoment = moment(time, 'hh:mm a');
  const startTimeMoment = moment(startTime, 'hh:mm a');
  const endTimeMoment = moment(endTime, 'hh:mm a');

  return (
    timeMoment.isSameOrAfter(startTimeMoment) &&
    timeMoment.isSameOrBefore(endTimeMoment)
  );
};

export const parseAttendanceDate = (dateTime: string) => {
  const split = dateTime.indexOf(' ');
  const americanDate = dateTime.substring(0, split);
  const [month, day, year] = americanDate.split('/');
  const time = dateTime.substring(split + 1);

  return {
    date: moment({
      year: parseInt(year, 10),
      month: parseInt(month, 10) - 1,
      day: parseInt(day, 10),
    }).format('YYYY-MM-DD'),
    time: moment(time, 'h:mm a').format('hh:mm a'),
  };
};
