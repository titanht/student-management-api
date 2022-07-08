import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';

export type DisplayRule = {
  A: number;
  B: number;
  C: number;
  D: number;
};

export const DEFAULT_DISPLAY_RULE = { A: 85, B: 70, C: 55, D: 0 };

export enum SubjectDisplay {
  Number = 'number',
  Letter = 'letter',
}

export enum SubjectReportTemplate {
  Main = 'main',
  Nursery = 'nursery',
}

export default class Subject extends Model {
  @column()
  public subject: string;

  @column()
  public code: string;

  @column()
  public consider_for_rank: boolean;

  @column()
  public order: number;

  @column({
    serialize: (val) => (val ? JSON.parse(val) : DEFAULT_DISPLAY_RULE),
  })
  public display_rules: DisplayRule;

  @column()
  public display_mode: SubjectDisplay;

  @column()
  public show_on_report: boolean;

  @column()
  public report_card_template: string;
}
