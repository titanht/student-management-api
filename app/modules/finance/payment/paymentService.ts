import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Service from 'app/modules/_shared/service';
import { pickFields } from 'app/services/utils';
import Payment, { PaymentType } from './payment';
import PaymentRepo from './paymentRepo';
import StagePayment from './stagePayment/stagePayment';

export default class PaymentService extends Service<Payment> {
  constructor() {
    super(new PaymentRepo());
  }

  async stagePayment(data: any, type: PaymentType) {
    return StagePayment.create({ data: JSON.stringify(data), type });
  }

  getAttachment() {
    return (this.repo as PaymentRepo).getAttachmentNumber();
  }

  async getPaymentData(createData: Partial<Payment>, auth: AuthContract) {
    const attachment = await this.getAttachment();
    const year = await AcademicYearService.getActive();

    return {
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
    };
  }

  async createTrx(
    trx: TransactionClientContract,
    createData: Partial<Payment>,
    auth: AuthContract,
    extraData = {}
  ) {
    const data = await this.getPaymentData(createData, auth);

    const payment = await this.repo.createModelTrx(trx, {
      ...data,
      ...extraData,
    });

    return payment;
  }

  async updateTrx(
    trx: TransactionClientContract,
    id: string,
    editData: Partial<Payment>
  ) {
    return this.repo.updateModelTrx(
      trx,
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
