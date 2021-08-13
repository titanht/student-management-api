import Factory from '@ioc:Adonis/Lucid/Factory';
import Student from 'app/modules/academic/student/student';
import { Gender } from 'app/modules/_shared/types';
import { getRandomItem } from 'app/test/testUtils';

export const StudentFactory = Factory.define(Student, ({ faker }) => {
  return {
    first_name: faker.lorem.sentence(),
    father_name: faker.lorem.sentence(),
    gender: getRandomItem(Object.values(Gender)),
    grand_father_name: faker.lorem.sentence(),
    id_number: faker.lorem.sentence(),
    primary_phone: faker.lorem.sentence(),
    img: faker.lorem.sentence(),
    scholarship_amount: faker.datatype.number({ min: 1, max: 10000 }),
    age: faker.datatype.number({ max: 100, min: 1 }),
  };
})
  .merge(async (model, attrs, _ctx) => {
    model.merge(attrs);
  })
  .build();
