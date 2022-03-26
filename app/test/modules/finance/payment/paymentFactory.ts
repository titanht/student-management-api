import Factory from '@ioc:Adonis/Lucid/Factory';
import Payment, { PaymentType } from 'app/modules/finance/payment/payment';
import { AcademicYearFactory } from '../../academic/academicYear/academicFactory';
import { StudentFactory } from '../../academic/student/studentFactory';
import { UserFactory } from '../../auth/userFactory';

export const PaymentFactory = Factory.define(Payment, ({ faker }) => {
  return {
    fee: faker.datatype.number({ min: 1000, max: 3000 }),
    attachment: faker.datatype.number({ min: 1000, max: 3000 }),
    fs: faker.datatype.number({ min: 1000, max: 3000 }),
    cash: faker.datatype.number({ min: 1000, max: 3000 }),
    user_id: faker.lorem.sentence(),
    student_id: faker.lorem.sentence(),
    academic_year_id: faker.lorem.sentence(),
    hidden: faker.datatype.boolean(),
    slip_date: null,
    remark: faker.lorem.sentence(),
    payment_type: PaymentType.Fee,
  };
})
  .relation('student', () => StudentFactory)
  .relation('user', () => UserFactory)
  .relation('academicYear', () => AcademicYearFactory)
  .build();
