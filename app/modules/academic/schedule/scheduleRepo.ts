import { Repo } from 'app/modules/_shared/repo';
import Schedule from './schedules';

export default class ScheduleRepo extends Repo<Schedule> {
  constructor() {
    super(Schedule);
  }
}
