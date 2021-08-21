import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import { Repo } from 'app/modules/_shared/repo';
import { Months, PaymentType } from '../payment';
import Fee from './fee';

export default class FeeRepo extends Repo<Fee> {
  constructor() {
    super(Fee);
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
}
