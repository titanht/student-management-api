import { v4 } from 'uuid';
import Factory from '@ioc:Adonis/Lucid/Factory';
import Sml from 'app/modules/academic/marklist/sml/sml';
import { DateTime } from 'luxon';
import { GradeStudentFactory } from '../../gradeStudent/gradeStudentFactory';
import { EvaluationMethodFactory } from '../evaluationMethod/evaluationMethodFactory';

export const SmlFactory = Factory.define(Sml, ({ faker }) => {
  return {
    score: faker.datatype.number({ min: 1, max: 10000 }),
    finalized: faker.datatype.boolean(),
    finalize_date: DateTime.fromISO('1990-11-20'),
    evaluation_method_id: v4(),
  };
})
  .relation('evaluationMethod', () => EvaluationMethodFactory)
  .relation('gradeStudent', () => GradeStudentFactory)
  .build();
