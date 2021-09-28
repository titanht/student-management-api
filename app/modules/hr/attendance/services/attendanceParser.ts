import moment from 'moment';

export class AttendanceParser {
  private attendanceData: any;
  private settings: any;

  /**
   *
   * @param {Object} attendanceData - csv parsed data
   * @param {Object} settings - account id to late_in and early_out data
   */
  constructor(attendanceData, settings) {
    this.attendanceData = attendanceData;
    this.settings = settings;
  }

  parseData() {
    const parsedAttendance = {};
    this.attendanceData.forEach((rowData) => {
      const { accountId } = rowData;
      if (parsedAttendance[accountId] === undefined) {
        parsedAttendance[accountId] = {};
      }
      const assessedData = this.assessDate(
        rowData,
        parsedAttendance[accountId],
        this.settings[accountId]
      );
      parsedAttendance[accountId] = {
        ...parsedAttendance[accountId],
        ...assessedData,
      };
    });

    return parsedAttendance;
  }

  assessDate(rowData, userData, userSettings) {
    const { in_begin, in_end, late_in, out_begin, out_end, early_out } =
      userSettings;
    const { attendanceDate } = rowData;
    const { date, time } = this.parseDate(attendanceDate);
    let currentData = userData[date];
    if (!currentData) {
      currentData = {
        time_in: null,
        time_out: null,
        present_in: null,
        present_out: null,
        late_in: null,
        early_out: null,
        only_in: null,
        only_out: null,
      };
    }

    const { time_in } = currentData;
    if (!time_in) {
      if (this.betweenTime(time, in_begin, in_end)) {
        currentData.time_in = time;
        currentData.only_in = true;

        if (this.betweenTime(time, in_begin, late_in)) {
          currentData.present_in = true;
          currentData.late_in = null;
        } else {
          currentData.late_in = true;
          currentData.present_in = null;
        }
      }
    }

    if (this.betweenTime(time, out_begin, out_end)) {
      currentData.time_out = time;
      currentData.only_out = true;

      if (currentData.only_in) {
        currentData.only_in = null;
        currentData.only_out = null;
      }

      if (this.betweenTime(time, early_out, out_end)) {
        currentData.present_out = true;
        currentData.early_out = null;
      } else {
        currentData.early_out = true;
        currentData.present_out = null;
      }
    }

    return {
      [date]: currentData,
    };
  }

  betweenTime(curTime, startTime, endTime) {
    const curFormat = moment(curTime, 'hh:mm a');
    const startFormat = moment(startTime, 'hh:mm a');
    const endFormat = moment(endTime, 'hh:mm a');

    return (
      curFormat.isSameOrAfter(startFormat) &&
      curFormat.isSameOrBefore(endFormat)
    );
  }

  parseDate(attendanceDate) {
    const split = attendanceDate.indexOf(' ');
    const americanDate = attendanceDate.substring(0, split);
    const [month, day, year] = americanDate.split('/');
    const time = attendanceDate.substring(split + 1);

    return {
      date: moment({ year, month: month - 1, day }).format('YYYY-MM-DD'),
      time: moment(time, 'h:mm a').format('hh:mm a'),
    };
  }
}
