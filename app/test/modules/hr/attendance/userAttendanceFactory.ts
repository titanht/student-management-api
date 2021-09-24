import Factory from '@ioc:Adonis/Lucid/Factory';
import UserAttendance from 'app/modules/hr/attendance/userAttendance';

export const UserAttendanceFactory = Factory.define(UserAttendance, ({ faker }) => {
  return {
    date: faker.date.recent().toISOString().substring(0, 10),
    day_week: faker.datatype.number({ min: 1000, max: 3000 }),
    week_year: faker.datatype.number({ min: 1000, max: 3000 }),
    month: faker.datatype.number({ min: 1000, max: 3000 }),
    time_in: 00:00,
    time_out: 00:00,
    present_in: faker.datatype.number(),
    present_out: faker.datatype.number(),
    late_in: faker.datatype.number(),
    early_out: faker.datatype.number(),
    only_in: faker.datatype.number(),
    only_out: faker.datatype.number(),
    user_id: faker.lorem.sentence(),
  };
})
.build();
