import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Fee from './fee';
import FeeService, { FeeData } from './feeService';
import CFeeVal from './cFeeVal';
import EFeeVal from './eFeeVal';
import StageFeeVal from './stageFeeVal';

export default class FeeController extends ApiController<Fee> {
  constructor(protected service = new FeeService()) {
    super(service, {
      createValidator: CFeeVal,
      editValidator: EFeeVal,
    });
  }

  async nonPaidMonths({ request, response }: HttpContextContract) {
    const studentId = request.params().student_id;
    const months = await this.service.getNonPaidMonths(studentId);

    return response.status(200).json({ data: months });
  }

  async stage({ request, response }: HttpContextContract) {
    const data = await request.validate(StageFeeVal);
    await this.service.stage(data as FeeData);

    return response.status(201).json({ data: true });
  }

  async unpaidMonth({ request, response }: HttpContextContract) {
    const { month } = request.params();
    const unpaid = await this.service.unpaidByMonth(month);

    return response.json({ data: unpaid });
  }

  async unpaidMonthGrade({ request, response }: HttpContextContract) {
    const { grade_id, month } = request.params();
    const unpaid = await this.service.unpaidMonthGrade(month, grade_id);

    return response.json({ data: unpaid });
  }
}
