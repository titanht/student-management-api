import Factory from '@ioc:Adonis/Lucid/Factory';
import Hrt from 'app/modules/academic/homeRoom/hrt/hrt';
import { UserFactory } from 'app/test/modules/auth/userFactory';
import { GradeFactory } from '../../grade/gradeFactory';

export const HrtFactory = Factory.define(Hrt, ({}) => {
  return {};
})
  .relation('grade', () => GradeFactory)
  .relation('user', () => UserFactory)
  .build();
