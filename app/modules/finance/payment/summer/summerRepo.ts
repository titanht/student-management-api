import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import { Repo } from 'app/modules/_shared/repo';
import { PaymentType } from '../payment';
import Summer from './summer';

export default class SummerRepo extends Repo<Summer> {
  constructor() {
    super(Summer);
  }

  async alreadyPaidForCurrentYear(studentId: string) {
    const year = await AcademicYear.getActiveYear();
    const registration = await Summer.query()
      .whereHas('payment', (paymentBuilder) => {
        paymentBuilder
          .where('student_id', studentId)
          .where('academic_year_id', year.id)
          .where('payment_type', PaymentType.Summer);
      })
      .first();

    return registration !== null;
  }
}
