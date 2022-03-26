import { v4 } from 'uuid';
import Factory from '@ioc:Adonis/Lucid/Factory';
import Subject from 'app/modules/academic/marklist/subject/subject';

export const SubjectFactory = Factory.define(Subject, ({ faker }) => {
  return {
    subject: v4(),
    code: faker.lorem.sentence(),
    consider_for_rank: faker.datatype.boolean(),
  };
}).build();
