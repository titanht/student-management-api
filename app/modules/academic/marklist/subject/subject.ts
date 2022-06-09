import { column } from '@ioc:Adonis/Lucid/Orm';
import Model from 'app/modules/_shared/model';

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

  @column()
  public display_mode: SubjectDisplay;

  @column()
  public show_on_report: boolean;

  @column()
  public report_card_template: string;
}
