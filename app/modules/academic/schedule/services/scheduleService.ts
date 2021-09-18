import Service from 'app/modules/_shared/service';
import ScheduleRepo from '../scheduleRepo';
import Schedule from '../schedules';
import { ScheduleCreator } from './scheduleCreator';

export default class ScheduleService extends Service<Schedule> {
  constructor() {
    super(new ScheduleRepo());
  }

  async generateSchedule() {
    const schedule = await ScheduleCreator.createSchedule();

    return 'done';
  }
}
