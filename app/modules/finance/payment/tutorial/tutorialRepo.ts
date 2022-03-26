import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import { Repo } from 'app/modules/_shared/repo';
import { Months, PaymentType } from '../payment';
import Tutorial from './tutorial';

export default class TutorialRepo extends Repo<Tutorial> {
  constructor() {
    super(Tutorial);
  }

  async monthPaid(studentId: string, month: Months) {
    const year = await AcademicYearService.getActive();
    const payment = await Tutorial.query()
      .whereHas('payment', (pb) => {
        pb.where('student_id', studentId)
          .where('academic_year_id', year.id)
          .where('payment_type', PaymentType.Tutorial);
      })
      .where('month', month)
      .preload('payment')
      .first();

    return payment !== null;
  }
}
