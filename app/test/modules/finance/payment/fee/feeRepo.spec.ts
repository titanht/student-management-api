import FeeRepo from 'app/modules/finance/payment/fee/feeRepo';
import { Months, PaymentType } from 'app/modules/finance/payment/payment';
import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
import { GradeFactory } from 'app/test/modules/academic/grade/gradeFactory';
import { GradeStudentFactory } from 'app/test/modules/academic/gradeStudent/gradeStudentFactory';
import { StudentFactory } from 'app/test/modules/academic/student/studentFactory';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { PaymentFactory } from '../paymentFactory';
import { FeeFactory } from './feeFactory';

const feeRepo = new FeeRepo();

const getIds = (model: any) => model.map((item) => item.id);

transact('FeeRepo.unpaidMonthGrade', async () => {
  test('unpaid of grade by month', async () => {
    const year0 = await AcademicYearFactory.merge({ active: false }).create();
    const year1 = await AcademicYearFactory.merge({ active: true }).create();
    const student1 = await StudentFactory.create();
    const student2 = await StudentFactory.create();
    const student3 = await StudentFactory.create();
    const grade1 = await GradeFactory.create();
    const grade2 = await GradeFactory.create();

    // Test isolation
    await GradeStudentFactory.merge({
      student_id: student1.id,
      academic_year_id: year0.id,
    }).create();
    await GradeStudentFactory.merge({
      student_id: student2.id,
      academic_year_id: year0.id,
    }).create();

    await GradeStudentFactory.merge({
      student_id: student1.id,
      academic_year_id: year1.id,
      grade_id: grade1.id,
    }).create();
    await GradeStudentFactory.merge({
      student_id: student2.id,
      academic_year_id: year1.id,
      grade_id: grade1.id,
    }).create();
    await GradeStudentFactory.merge({
      student_id: student3.id,
      academic_year_id: year1.id,
      grade_id: grade2.id,
    }).create();

    let unpaid = await feeRepo.unpaidMonthGrade(
      'Meskerem',
      grade1.id,
      year1.id
    );
    expect(unpaid).to.deep.equal([]);

    unpaid = await feeRepo.unpaidMonthGrade('Meskerem', grade2.id, year1.id);
    expect(unpaid).to.deep.equal([]);

    await PaymentFactory.merge({
      payment_type: PaymentType.Registration,
      student_id: student1.id,
      academic_year_id: year1.id,
    }).create();
    await PaymentFactory.merge({
      payment_type: PaymentType.Registration,
      student_id: student3.id,
      academic_year_id: year1.id,
    }).create();

    unpaid = await feeRepo.unpaidMonthGrade('Meskerem', grade1.id, year1.id);
    expect(getIds(unpaid)).to.deep.equal([student1.id]);

    unpaid = await feeRepo.unpaidMonthGrade('Meskerem', grade2.id, year1.id);
    expect(getIds(unpaid)).to.deep.equal([student3.id]);
  });
});

transact('FeeRepo.unpaid', () => {
  test('unpaid by month', async () => {
    const year0 = await AcademicYearFactory.merge({ active: false }).create();
    const year1 = await AcademicYearFactory.merge({ active: true }).create();
    const student1 = await StudentFactory.create();
    const student2 = await StudentFactory.create();
    await GradeStudentFactory.merge({
      student_id: student1.id,
      academic_year_id: year1.id,
    }).create();
    await GradeStudentFactory.merge({
      student_id: student2.id,
      academic_year_id: year1.id,
    }).create();

    await PaymentFactory.merge({
      payment_type: PaymentType.Registration,
      student_id: student1.id,
      academic_year_id: year0.id,
    }).create();
    const payment0 = await PaymentFactory.merge({
      payment_type: PaymentType.Fee,
      student_id: student1.id,
      academic_year_id: year0.id,
    }).create();
    await FeeFactory.merge({
      payment_id: payment0.id,
      month: 'Meskerem',
    }).create();

    let unpaid = await feeRepo.unpaidMonth('Meskerem', year1.id);
    expect(unpaid).to.deep.equal([]);

    await PaymentFactory.merge({
      payment_type: PaymentType.Registration,
      student_id: student1.id,
      academic_year_id: year1.id,
    }).create();

    unpaid = await feeRepo.unpaidMonth('Meskerem', year1.id);
    expect(getIds(unpaid)).to.deep.equal([student1.id]);

    await PaymentFactory.merge({
      payment_type: PaymentType.Registration,
      student_id: student2.id,
      academic_year_id: year1.id,
    }).create();

    // Registered students only
    unpaid = await feeRepo.unpaidMonth('Meskerem', year1.id);
    expect(getIds(unpaid).sort()).to.deep.equal(
      [student1.id, student2.id].sort()
    );

    const payment = await PaymentFactory.merge({
      payment_type: PaymentType.Fee,
      student_id: student1.id,
      academic_year_id: year1.id,
    }).create();
    await FeeFactory.merge({
      payment_id: payment.id,
      month: 'Meskerem',
    }).create();

    unpaid = await feeRepo.unpaidMonth('Meskerem', year1.id);
    expect(getIds(unpaid)).to.deep.equal([student2.id]);

    unpaid = await feeRepo.unpaidMonth('Tikimt', year1.id);
    // console.log(JSON.stringify(unpaid, null, 2));
    expect(getIds(unpaid).sort()).to.deep.equal(
      [student1.id, student2.id].sort()
    );
  });
});

transact('FeeRepo.monthPaid', () => {
  test('returns true', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
      payment_type: PaymentType.Fee,
    }).create();
    await FeeFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    let paid = await feeRepo.monthPaid(payment.student_id, Months.Meskerem);
    expect(paid).to.be.true;

    paid = await feeRepo.monthPaid(payment.student_id, Months.Tikimt);
    expect(paid).to.be.false;
  });

  test('returns false for diff year', async () => {
    await AcademicYearFactory.merge({ active: true }).create();
    const ay = await AcademicYearFactory.merge({ active: false }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
    }).create();
    await FeeFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    const paid = await feeRepo.monthPaid(payment.student_id, Months.Meskerem);
    expect(paid).to.be.false;
  });

  test('returns false for diff payment type', async () => {
    const ay = await AcademicYearFactory.merge({ active: true }).create();
    const payment = await PaymentFactory.merge({
      academic_year_id: ay.id,
      payment_type: PaymentType.Tutorial,
    }).create();
    await FeeFactory.merge({
      payment_id: payment.id,
      month: Months.Meskerem,
    }).create();

    const paid = await feeRepo.monthPaid(payment.student_id, Months.Meskerem);
    expect(paid).to.be.false;
  });
});
