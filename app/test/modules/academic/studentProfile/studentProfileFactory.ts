import Factory from '@ioc:Adonis/Lucid/Factory';
import StudentProfile, {
  HealthTypes,
  SchoolLeaveReason,
} from 'app/modules/academic/studentProfile/studentProfile';
import { LifeCondition } from 'app/modules/_shared/types';
import { getRandomItem } from 'app/test/testUtils';
import { DateTime } from 'luxon';
import { StudentFactory } from '../student/studentFactory';

export const StudentProfileFactory = Factory.define(
  StudentProfile,
  ({ faker }) => {
    return {
      nationality: faker.lorem.sentence(),
      address_city: faker.lorem.sentence(),
      address_sub_city: faker.lorem.sentence(),
      address_woreda: faker.lorem.sentence(),
      house_number: faker.lorem.sentence(),
      student_phone_number: faker.lorem.sentence(),
      other_health_status: faker.lorem.sentence(),
      previous_school_name: faker.lorem.sentence(),
      previous_school_city: faker.lorem.sentence(),
      previous_school_sub_city: faker.lorem.sentence(),
      previous_school_woreda: faker.lorem.sentence(),
      school_leave_other: faker.lorem.sentence(),
      entry_class: faker.lorem.sentence(),
      parent_name: faker.lorem.sentence(),
      occupation: faker.lorem.sentence(),
      work_place: faker.lorem.sentence(),
      parent_phone_number: faker.lorem.sentence(),
      student_living_with: faker.lorem.sentence(),
      date_of_birth: '2020-01-01' as unknown as DateTime,
      student_photo: faker.lorem.sentence(),
      parent_photo: faker.lorem.sentence(),
      emergencies: faker.lorem.sentence(),
      student_id: faker.lorem.sentence(),
      health_status: getRandomItem(Object.values(HealthTypes)),
      previous_school_leave_reason: getRandomItem(
        Object.values(SchoolLeaveReason)
      ),
      father_condition: getRandomItem(Object.values(LifeCondition)),
      mother_condition: getRandomItem(Object.values(LifeCondition)),
    };
  }
)
  .relation('student', () => StudentFactory)
  .build();
