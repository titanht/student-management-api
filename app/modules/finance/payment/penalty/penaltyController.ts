import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PenaltyService from './penaltyService';

export default class PenaltyController {
  constructor(protected service = new PenaltyService()) {}

  async getPenaltyCurrent({ response, request }: HttpContextContract) {
    const { month } = request.params();
    const penalty = await this.service.getPenaltyCurrent(month);

    return response.json({ data: penalty });
  }

  async getPenaltySlip({ response, request }: HttpContextContract) {
    const { month, end_date } = request.params();
    const penalty = await this.service.getPenaltySlip(month, end_date);

    return response.status(200).json({ data: penalty });
  }
}
