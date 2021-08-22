import test from 'japa';
import SummerRepo from 'app/modules/finance/payment/summer/summerRepo';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import { SummerFactory } from './summerFactory';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';
import { PaymentType } from 'app/modules/finance/payment/payment';

const regRepo = new SummerRepo();

transact('SummerRepo.alreadyPaidForCurrentYear', () => {
  test('returns false', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const ay2 = await AcademicYearFactory.merge({ active: false }).create();
    const student = await StudentFactory.create();
    await SummerFactory.with('payment', 1, (paymentFact) => {
      paymentFact
        .merge({
          payment_type: PaymentType.Summer,
          student_id: student.id,
          academic_year_id: ay2.id,
        })
        .create();
    }).create();

    expect(await regRepo.alreadyPaidForCurrentYear(student.id)).to.be.false;
  });

  test('returns true', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const student = await StudentFactory.create();
    await SummerFactory.with('payment', 1, (paymentFact) => {
      paymentFact
        .merge({
          payment_type: PaymentType.Summer,
          student_id: student.id,
          academic_year_id: ay.id,
        })
        .create();
    }).create();

    expect(await regRepo.alreadyPaidForCurrentYear(student.id)).to.be.true;
  });
});
