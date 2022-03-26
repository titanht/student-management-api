/* eslint-disable @typescript-eslint/naming-convention */
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import { transactify } from 'app/services/utils';
import { DateTime } from 'luxon';
import AcademicYear from '../../academicYear/academicYear';
import StudentAttendance from './studentAttendance';
import StudentAttendanceRepo from './studentAttendanceRepo';

export type StudentAttendanceArg = {
  student_ids: string[];
  statuses: string[];
  late_reasons: string[];
  date: DateTime;
};

export default class StudentAttendanceService extends Service<StudentAttendance> {
  constructor() {
    super(new StudentAttendanceRepo());
  }

  async create(createData: any, auth: AuthContract) {
    createData = createData as StudentAttendanceArg;
    const year = await AcademicYear.getActiveYear();
    await transactify(async () => {
      const { student_ids, statuses, late_reasons, date } = createData;
      const promises: Promise<any>[] = [];
      for (let i = 0; i < student_ids.length; i++) {
        promises.push(
          StudentAttendance.updateOrCreate(
            {
              student_id: student_ids[i],
              date: date.toISODate(),
              academic_year_id: year.id,
            },
            {
              user_id: auth.user?.id,
              late_reason: late_reasons[i] || '',
              status: statuses[i],
            }
          )
        );
        await Promise.all(promises);
      }
    });

    return {} as StudentAttendance;
  }
}
