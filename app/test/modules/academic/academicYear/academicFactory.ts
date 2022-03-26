import Factory from '@ioc:Adonis/Lucid/Factory';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';

export const AcademicYearFactory = Factory.define(AcademicYear, ({ faker }) => {
  return {
    year: faker.datatype.number({ min: 1900, max: 9999 }),
    active: false,
  };
}).build();
