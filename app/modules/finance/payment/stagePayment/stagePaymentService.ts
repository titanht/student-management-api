import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import Service from 'app/modules/_shared/service';
import { getCount, transactLocalized } from 'app/services/utils';
import FeeService from '../fee/feeService';
import OtherService from '../other/otherService';
import { PaymentType } from '../payment';
import RegistrationService from '../registration/registrationService';
import SummerService from '../summer/summerService';
import TutorialService from '../tutorial/tutorialService';
import StagePayment from './stagePayment';
import StagePaymentRepo from './stagePaymentRepo';

export interface StageExtra {
  academic_year_id: string;
}

interface CommitType {
  fee: any[];
  registration: any[];
  tutorial: any[];
  summer: any[];
  other: any[];
}

export default class StagePaymentService extends Service<StagePayment> {
  constructor() {
    super(new StagePaymentRepo());
  }

  async fetchAll() {
    return (this.repo as StagePaymentRepo).fetchAll();
  }

  async commit(auth: AuthContract) {
    const stagePayments = (await StagePayment.query()).map((item) =>
      item.serialize()
    ) as StagePayment[];
    let fs = '';
    let attachment = '';
    if (stagePayments.length) {
      fs = JSON.parse(stagePayments[0].data).fs;
      attachment = JSON.parse(stagePayments[0].data).attachment;
    }
    const year = await AcademicYearService.getActive();
    const extra: StageExtra = {
      academic_year_id: year.id,
    };

    const commitData: CommitType = {
      fee: [],
      other: [],
      registration: [],
      tutorial: [],
      summer: [],
    };

    // console.log(stagePayments)
    await transactLocalized(async (trx) => {
      for (let i = 0; i < stagePayments.length; i++) {
        const payment = stagePayments[i];
        if (payment.type === PaymentType.Fee) {
          commitData.fee.push(
            await new FeeService().stageTrx(
              trx,
              JSON.parse(payment.data),
              auth,
              extra
            )
          );
        } else if (payment.type === PaymentType.Tutorial) {
          commitData.tutorial.push(
            await new TutorialService().stageTrx(
              trx,
              JSON.parse(payment.data),
              auth,
              extra
            )
          );
        } else if (payment.type === PaymentType.Summer) {
          commitData.summer.push(
            await new SummerService().stageTrx(
              trx,
              JSON.parse(payment.data),
              auth,
              extra
            )
          );
        } else if (payment.type === PaymentType.Registration) {
          commitData.registration.push(
            await new RegistrationService().stageTrx(
              trx,
              JSON.parse(payment.data),
              auth,
              extra
            )
          );
        } else if (payment.type === PaymentType.Other) {
          commitData.other.push(
            await new OtherService().stageTrx(
              trx,
              JSON.parse(payment.data),
              auth,
              extra
            )
          );
        }
      }
    });

    let total = 0;
    Object.values(commitData).forEach((item) => {
      item.forEach((payment) => {
        total += payment.fee;
      });
      // total += item.fee;
    });
    await this.removeAll();

    return { attachment, fs, payment: commitData, total };
  }

  async stage(data: object, type: PaymentType) {
    return this.repo.createModel({
      data: JSON.stringify(data),
      type,
    });
  }

  async getFs() {
    const stage = await StagePayment.firstOrFail();

    return JSON.parse(stage.data).fs;
  }

  async getAttachment() {
    const stage = await StagePayment.firstOrFail();

    return JSON.parse(stage.data).attachment;
  }

  async isPending() {
    return (await getCount(StagePayment)) > 0;
  }

  async isPendingType(paymentType: PaymentType) {
    return (
      (await (this.repo as StagePaymentRepo).getStageCount(paymentType)) > 0
    );
  }

  async removeAll() {
    return (this.repo as StagePaymentRepo).removeAll();
  }

  async getSummary() {
    return (this.repo as StagePaymentRepo).getSummary();
  }
}
