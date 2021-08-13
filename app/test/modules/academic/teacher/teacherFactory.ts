import Factory from '@ioc:Adonis/Lucid/Factory';
import Teacher from 'app/modules/academic/teacher/teacher';
import { UserFactory } from '../../auth/userFactory';

export const TeacherFactory = Factory.define(Teacher, ({}) => {
  return {};
})
  .relation('user', () => UserFactory)
  .build();
