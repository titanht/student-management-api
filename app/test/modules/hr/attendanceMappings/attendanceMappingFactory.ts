import Factory from '@ioc:Adonis/Lucid/Factory';
import AttendanceMapping from 'app/modules/hr/attendanceMappings/attendanceMapping';
import { UserFactory } from '../../auth/userFactory';
import { AttendanceSettingFactory } from '../attendanceSettings/attendanceSettingFactory';

export const AttendanceMappingFactory = Factory.define(
  AttendanceMapping,
  ({ faker }) => {
    return {
      account_id: faker.lorem.sentence(),
      attendance_setting_id: faker.lorem.sentence(),
      user_id: faker.lorem.sentence(),
    };
  }
)
  .relation('attendanceSetting', () => AttendanceSettingFactory)
  .relation('user', () => UserFactory)
  .build();
