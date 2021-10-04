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

  async getSchedule({ response }: HttpContextContract) {
    const schedule = await this.service.getSchedule();

    return response.status(200).json(schedule);
  }

  async updateSchedule({ response, request }: HttpContextContract) {
    const { schedule } = request.all();
    const updated = await this.service.updateSchedule(schedule);

    return response.json({ data: updated });
  }

  async isSwappable(ctx: HttpContextContract) {
    const schedule = await this.service.isSwappable(ctx);

    return ctx.response.json({ data: schedule });
  }

  async finalize({ response }: HttpContextContract) {
    const schedule = await this.service.finalize();

    return response.json({ data: schedule });
  }
}
