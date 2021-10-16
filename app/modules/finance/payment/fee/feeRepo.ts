import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Student from 'app/modules/academic/student/student';
import { Repo } from 'app/modules/_shared/repo';
import { Months, PaymentType } from '../payment';
import Fee from './fee';

export default class FeeRepo extends Repo<Fee> {
  constructor() {
    super(Fee);
  }

  async nonPaidMonths(studentId: string) {
    const year = await AcademicYearService.getActive();
    const paidMonths = (
      await Fee.query().whereHas('payment', (pb) => {
        pb.where('student_id', studentId)
          .where('academic_year_id', year.id)
          .where('payment_type', PaymentType.Fee);
      })
    ).map((i) => i.month);

    return Object.values(Months).filter((month) => !paidMonths.includes(month));
  }

  async monthPaid(studentId: string, month: Months) {
    const year = await AcademicYearService.getActive();
    const payment = await Fee.query()
      .whereHas('payment', (pb) => {
        pb.where('student_id', studentId)
          .where('academic_year_id', year.id)
          .where('payment_type', PaymentType.Fee);
      })
      .where('month', month)
      .first();

    return payment !== null;
  }

  async unpaidMonth(month: string, yearId: string) {
    const students = await Student.query()
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', yearId).preload('grade');
      })
      .whereHas('gradeStudents', (builder) => {
        builder.where('academic_year_id', yearId);
      })
      .whereHas('payments', (builder) => {
        builder
          .where('academic_year_id', yearId)
          .where('payment_type', PaymentType.Registration);
      })
      .whereDoesntHave('payments', (builder) => {
        builder
          .where('academic_year_id', yearId)
          .where('payment_type', PaymentType.Fee)
          .whereHas('feePayment', (feeBuilder) => {
            feeBuilder.where('month', month);
          });
      })
      .orderBy('first_name');

    return this.massSerialize(students);
  }

  async unpaidMonthGrade(month, gradeId, yearId) {
    const students = await Student.query()
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', yearId).preload('grade');
      })
      .whereHas('gradeStudents', (builder) => {
        builder.where('academic_year_id', yearId).where('grade_id', gradeId);
      })
      .whereHas('payments', (builder) => {
        builder
          .where('academic_year_id', yearId)
          .where('payment_type', PaymentType.Registration);
      })
      .whereDoesntHave('payments', (builder) => {
        builder
          .where('academic_year_id', yearId)
          .where('payment_type', PaymentType.Fee)
          .whereHas('feePayment', (feeBuilder) => {
            feeBuilder.where('month', month);
          });
      })
      .orderBy('first_name');

    return this.massSerialize(students);
  }
}
