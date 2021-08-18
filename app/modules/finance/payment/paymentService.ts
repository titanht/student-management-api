import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Service from 'app/modules/_shared/service';
import { pickFields } from 'app/services/utils';
import Payment from './payment';
import PaymentRepo from './paymentRepo';

export default class PaymentService extends Service<Payment> {
  constructor() {
    super(new PaymentRepo());
  }

  getAttachment() {
    return (this.repo as PaymentRepo).getAttachmentNumber();
  }

  async create(createData: Partial<Payment>, auth: AuthContract) {
    const attachment = await this.getAttachment();
    const year = await AcademicYearService.getActive();
    const payment = (await this.repo.createModel({
      ...pickFields(createData, [
        'fee',
        'fs',
        'cash',
        'student_id',
        'slip_date',
        'remark',
        'payment_type',
      ]),
      user_id: auth.user?.id,
      hidden: false,
      attachment,
      academic_year_id: year.id,
    })) as Payment;

    return payment;
  }

  async update(id: string, editData: Partial<Payment>) {
    return this.repo.updateModel(
      id,
      pickFields(editData, [
        'fee',
        'attachment',
        'fs',
        'cash',
        'student_id',
        'slip_date',
        'remark',
        'hidden',
      ])
    );
  }
}
