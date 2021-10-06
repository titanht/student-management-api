import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Service from 'app/modules/_shared/service';
import AcademicYearService from '../../academicYear/academicYearService';
import ScheduleRepo from '../scheduleRepo';
import Schedule from '../schedules';
import { ScheduleCreator } from './scheduleCreator';
import { ScheduleUtils } from './scheduleUtils';
import { Swappable } from './swappable';

export default class ScheduleService extends Service<Schedule> {
  constructor() {
    super(new ScheduleRepo());
  }

  async generateSchedule() {
    const yearId = (await AcademicYearService.getActive()).id;
    const schedule = await ScheduleCreator.createSchedule();
    schedule.schedule = await ScheduleUtils.remapSchedule(schedule.schedule);
    // console.log('remapped');

    await Schedule.updateOrCreate(
      { academic_year_id: yearId },
      {
        schedule: JSON.stringify(schedule.schedule),
      }
    );

    return schedule;
  }

  async isSwappable({ request }: HttpContextContract) {
    const yearId = (await AcademicYearService.getActive()).id;
    const { grade, source_day, source_period, target_day, target_period } =
      request.all();

    const scheduleModel = await Schedule.query()
      .where('academic_year_id', yearId)
      .firstOrFail();

    const schedule = scheduleModel.serialize();

    const source = {
      day: source_day,
      period: source_period,
    };
    const target = {
      day: target_day,
      period: target_period,
    };
    const parsedSchedule = JSON.parse(schedule.schedule);
    const scheduleData = { ...parsedSchedule.scheduleData };

    // const swappable = true;
    const swappable = Swappable.isSwappable(
      scheduleData,
      grade,
      source,
      target
    );

    // console.log(JSON.parse(schedule.schedule).scheduleData);
    if (swappable) {
      const sourceData = scheduleData[grade][source_day][source_period];
      scheduleData[grade][source_day][source_period] =
        scheduleData[grade][target_day][target_period];
      scheduleData[grade][target_day][target_period] = sourceData;

      // console.log(sourceData);
      scheduleModel.schedule = JSON.stringify({
        ...parsedSchedule,
        scheduleData,
      });
      await scheduleModel.save();
    }

    return swappable;
  }

  async getSchedule() {
    const yearId = (await AcademicYearService.getActive()).id;

    const schedule = await Schedule.query()
      .where('academic_year_id', yearId)
      .firstOrFail();
    schedule.schedule = JSON.parse(schedule.schedule);

    return schedule;
  }

  async updateSchedule(scheduleUpdate: any) {
    const yearId = (await AcademicYearService.getActive()).id;

    const schedule = await Schedule.query()
      .where('academic_year_id', yearId)
      .firstOrFail();

    schedule.schedule = JSON.stringify(scheduleUpdate);
    await schedule.save();

    schedule.schedule = JSON.parse(schedule.schedule);

    return schedule;
  }

  async finalize() {
    const yearId = (await AcademicYearService.getActive()).id;

    const schedule = await Schedule.query()
      .where('academic_year_id', yearId)
      .firstOrFail();
    schedule.finalized = true;
    await schedule.save();

    return schedule;
  }
}
