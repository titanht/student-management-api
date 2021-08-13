import Factory from '@ioc:Adonis/Lucid/Factory';
import StudentAttendance, {
  AttendanceTypes,
} from 'app/modules/academic/homeRoom/studentAttendance/studentAttendance';
import { UserFactory } from 'app/test/modules/auth/userFactory';
import { getRandomItem } from 'app/test/testUtils';
import { DateTime } from 'luxon';
import { AcademicYearFactory } from '../../academicYear/academicFactory';
import { StudentFactory } from '../../student/studentFactory';

export const StudentAttendanceFactory = Factory.define(
  StudentAttendance,
  ({ faker }) => {
    return {
      status: getRandomItem(Object.values(AttendanceTypes)),
      date: DateTime.fromJSDate(new Date('2020-01-01')),
      late_reason: faker.lorem.sentence(),
    };
  }
)
  .relation('academicYear', () => AcademicYearFactory)
  .relation('student', () => StudentFactory)
  .relation('user', () => UserFactory)
  .build();
