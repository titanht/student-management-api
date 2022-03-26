import Factory from '@ioc:Adonis/Lucid/Factory';
import AttendanceSetting from 'app/modules/hr/attendanceSettings/attendanceSetting';

export const AttendanceSettingFactory = Factory.define(
  AttendanceSetting,
  ({ faker }) => {
    return {
      in_begin: '01:10 am',
      in_end: '02:10 am',
      late_in: '03:10 am',
      out_begin: '01:10 pm',
      out_end: '04:10 pm',
      early_out: '03:10 pm',
      title: faker.lorem.sentence(),
    };
  }
).build();
