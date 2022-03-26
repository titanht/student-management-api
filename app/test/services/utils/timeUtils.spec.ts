import { betweenTime, parseAttendanceDate } from 'app/services/utils/timeUtils';
import { expect } from 'chai';
import test from 'japa';

test.group('timeUtils', () => {
  test.group('parseAttendanceDate', () => {
    test('parses date', () => {
      expect(parseAttendanceDate('9/23/2019 10:24 AM')).to.deep.equal({
        date: '2019-09-23',
        time: '10:24 am',
      });
    });
  });

  test.group('betweenTime', () => {
    test('returns true', () => {
      const startTime = '12:00 am';
      const endTime = '06:59 am';

      expect(betweenTime('12:00 am', startTime, endTime)).to.be.true;
      expect(betweenTime('12:01 am', startTime, endTime)).to.be.true;
      expect(betweenTime('06:59 am', startTime, endTime)).to.be.true;
      expect(betweenTime('06:58 am', startTime, endTime)).to.be.true;
      expect(betweenTime('04:00 am', startTime, endTime)).to.be.true;
    });

    test('returns false', () => {
      const startTime = '12:00 am';
      const endTime = '06:59 am';

      expect(betweenTime('11:59 pm', startTime, endTime)).to.be.false;
      expect(betweenTime('07:00 am', startTime, endTime)).to.be.false;
      expect(betweenTime('08:00 am', startTime, endTime)).to.be.false;
      expect(betweenTime('06:58 pm', startTime, endTime)).to.be.false;
    });
  });
});
