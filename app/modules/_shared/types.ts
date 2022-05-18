import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm';
import Model from './model';

export const AcademicPermissions = ['add-academic-year', 'view-academic-year'];

export const Permissions = [...AcademicPermissions];

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum LifeCondition {
  Alive = 'ALIVE',
  Dead = 'DEAD',
  AliveNotTogether = 'ALIVE_BUT_DOES_NOT_LIVE_TOGETHER',
}

export type QueryType = ModelQueryBuilderContract<typeof Model, Model>;

export const Keys = Object.keys;

export const quarterMap = { 1: 'q1', 2: 'q2', 3: 'q3', 4: 'q4' };

export const semesterMap = { 1: 's1', 2: 's2' };

export enum StudentStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}
