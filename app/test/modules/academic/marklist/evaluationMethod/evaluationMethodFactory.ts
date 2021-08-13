import Factory from '@ioc:Adonis/Lucid/Factory';
import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
import { CstFactory } from '../cst/cstFactory';
import { EvaluationTypeFactory } from '../evaluationType/evaluationTypeFactory';
import { QuarterFactory } from '../quarter/quarterFactory';

export const EvaluationMethodFactory = Factory.define(
  EvaluationMethod,
  ({}) => {
    return {};
  }
)
  .relation('cst', () => CstFactory)
  .relation('quarter', () => QuarterFactory)
  .relation('evaluationType', () => EvaluationTypeFactory)
  .build();
