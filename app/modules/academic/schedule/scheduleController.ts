import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ApiController from 'app/modules/_shared/apiController';
import Schedule from './schedules';
import ScheduleService from './services/scheduleService';

export default class ScheduleController extends ApiController<Schedule> {
  constructor(protected service: ScheduleService = new ScheduleService()) {
    super(service, {});
  }

  async generate({ response }: HttpContextContract) {
    const schedule = await this.service.generateSchedule();

    return response.status(200).json({ data: schedule });
  }
}
