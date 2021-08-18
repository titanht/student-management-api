import {
  column,
  BelongsTo,
  belongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import Student from 'app/modules/academic/student/student';
import User from 'app/modules/auth/user';
import Model from 'app/modules/_shared/model';
import { DateTime } from 'luxon';
import Fee from './fee/fee';
import Registration from './registration/registration';
import Tutorial from './tutorial/tutorial';

export enum Months {
  Meskerem = 'Meskerem',
  Tikimt = 'Tikimt',
  Hidar = 'Hidar',
  Tahisas = 'Tahisas',
  Tir = 'Tir',
  Yekatit = 'Yekatit',
  Megabit = 'Megabit',
  Miyazya = 'Miyazya',
  Ginbot = 'Ginbot',
  Sene = 'Sene',
}

export enum PaymentType {
  Fee = 'Fee',
  Tutorial = 'Tutorial',
  Registration = 'Registration',
  Summer = 'Summer',
  Other = 'Other',
}

export default class Payment extends Model {
  @column()
  public fee: number;

  @column()
  public attachment: number;

  @column()
  public fs: number;

  @column()
  public cash: number;

  @column()
  public user_id: string;

  @column()
  public student_id: string;

  @column()
  public academic_year_id: string;

  @column()
  public hidden: boolean;

  @column.date()
  public slip_date?: DateTime | null;

  @column()
  public remark: string;

  @column()
  public payment_type: PaymentType;

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>;

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>;

  @belongsTo(() => AcademicYear, {
    foreignKey: 'academic_year_id',
  })
  public academicYear: BelongsTo<typeof AcademicYear>;

  @hasMany(() => Registration, {
    foreignKey: 'payment_id',
  })
  public registrations: HasMany<typeof Registration>;

  @hasMany(() => Fee, {
    foreignKey: 'payment_id',
  })
  public fees: HasMany<typeof Fee>;

  @hasMany(() => Tutorial, {
    foreignKey: 'payment_id',
  })
  public tutorials: HasMany<typeof Tutorial>;
}
