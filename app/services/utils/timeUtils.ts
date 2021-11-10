import moment from 'moment';
import * as zemen from 'zemen';

const JDN_OFFSET = 1723856;

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

export const toJulian = (year: number, month: number, day: number) => {
  const a = Math.floor((14 - month) / 12);
  const y = Math.floor(year + 4800 - a);
  const m = month + 12 * a - 3;
  const JDN =
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045;

  return JDN;
};

export const fromJulian = (JD: number) => {
  const y = 4716;
  const v = 3;
  const j = 1401;
  const u = 5;
  const m = 2;
  const s = 153;
  const n = 12;
  const w = 2;
  const r = 4;
  const B = 274277;
  const p = 1461;
  const C = -38;
  const f =
    JD + j + Math.floor((Math.floor((4 * JD + B) / 146097) * 3) / 4) + C;
  const e = r * f + v;
  const g = Math.floor((e % p) / r);
  const h = u * g + w;
  const D = Math.floor((h % s) / u) + 1;
  const M = ((Math.floor(h / s) + m) % n) + 1;
  const Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n);

  const date = new Date(Y, M - 1, D);

  return moment(date)
    .format('YYYY-MM-DD')
    .split('-')
    .map((i) => parseInt(i, 10));
};

export const ethiopianToJD = (year: number, month: number, day: number) => {
  return (
    JDN_OFFSET +
    365 +
    365 * (year - 1) +
    // parseInt(year / 4, 10) +
    year / 4 +
    30 * month +
    day -
    31
  );
};

export const convertToEthiopian = (year, month, day) => {
  const jdn = toJulian(year, month, day);

  const r = (jdn - JDN_OFFSET) % 1461;
  const n = (r % 365) + 365 * parseInt(r / 1460, 10);

  const convertedYear =
    4 * parseInt((jdn - JDN_OFFSET) / 1461, 10) +
    parseInt(r / 365, 10) -
    parseInt(r / 1460, 10);
  const convertedMonth = parseInt(n / 30, 10) + 1;
  const convertedDay = (n % 30) + 1;

  return [convertedYear, convertedMonth, convertedDay];
};

const convertToGregorian = (year, month, day) => {
  const jd = ethiopianToJD(year, month, day);

  return fromJulian(jd);
};

const getEthiopianYear = () => {
  const date = moment(new Date())
    .format('YYYY-MM-DD')
    .split('-')
    .map((i) => parseInt(i, 10));

  return convertToEthiopian(...date)[0];
};
