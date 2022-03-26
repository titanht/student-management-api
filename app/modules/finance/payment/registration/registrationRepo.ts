import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import { Repo } from 'app/modules/_shared/repo';
import { PaymentType } from '../payment';
import Registration from './registration';

export default class RegistrationRepo extends Repo<Registration> {
  constructor() {
    super(Registration);
  }

  async alreadyRegisteredForCurrentYear(studentId: string) {
    const year = await AcademicYear.getActiveYear();
    const registration = await Registration.query()
      .whereHas('payment', (paymentBuilder) => {
        paymentBuilder
          .where('student_id', studentId)
          .where('academic_year_id', year.id)
          .where('payment_type', PaymentType.Registration);
      })
      .first();

    return registration !== null;
  }
}
