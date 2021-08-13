import test from 'japa';
import RegistrationRepo from 'app/modules/finance/payment/registration/registrationRepo';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import { RegistrationFactory } from './registrationFactory';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';

const regRepo = new RegistrationRepo();

transact('RegistrationRepo.alreadyRegisteredForCurrentYear', () => {
  test('returns false', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const ay2 = await AcademicYearFactory.merge({ active: false }).create();
    const student = await StudentFactory.create();
    await RegistrationFactory.with('payment', 1, (paymentFact) => {
      paymentFact
        .merge({ student_id: student.id, academic_year_id: ay2.id })
        .create();
    }).create();

    expect(await regRepo.alreadyRegisteredForCurrentYear(student.id)).to.be
      .false;
  });

  test('returns true', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const student = await StudentFactory.create();
    await RegistrationFactory.with('payment', 1, (paymentFact) => {
      paymentFact
        .merge({ student_id: student.id, academic_year_id: ay.id })
        .create();
    }).create();

    expect(await regRepo.alreadyRegisteredForCurrentYear(student.id)).to.be
      .true;
  });
});
