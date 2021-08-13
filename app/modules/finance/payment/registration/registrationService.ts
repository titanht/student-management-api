import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Service from 'app/modules/_shared/service';
import { pickFields, transactify } from 'app/services/utils';
import Payment from '../payment';
import PaymentRepo from '../paymentRepo';
import PaymentService from '../paymentService';
import Registration from './registration';
import RegistrationRepo from './registrationRepo';

export default class RegistrationService extends Service<Registration> {
  protected paymentService: PaymentService;

  constructor() {
    super(new RegistrationRepo());
    this.paymentService = new PaymentService();
  }

  async create(createData: Partial<Registration>, auth: AuthContract) {
    // console.log('Auth in registrationService', !!auth!.user);
    let data = {};

    const attachment = await new PaymentService().getAttachment();
    const year = await AcademicYearService.getActive();

    const payment = (await new PaymentRepo().createModel({
      ...pickFields(createData, [
        'fee',
        'fs',
        'cash',
        'student_id',
        'slip_date',
        'remark',
      ]),
      user_id: auth.user?.id,
      hidden: false,
      attachment,
      academic_year_id: year.id,
    })) as Payment;
    const regFee = await this.repo.createModel({
      payment_id: payment.id,
    });
    data = {
      ...payment.serialize(),
      ...regFee.serialize(),
    };

    return data as Registration;
  }

  // TODO: Add Unit test
  async update(id: string, editData: Partial<Registration>) {
    let data = {};

    const fee = await Registration.findOrFail(id);
    await transactify(async () => {
      await this.paymentService.update(fee.payment_id, editData as Payment);
      data = {
        ...editData,
      };
    });

    return data as Registration;
  }
}
