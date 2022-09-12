import { RequestContract } from '@ioc:Adonis/Core/Request';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import { transactLocalized } from 'app/services/utils';
import StudentAttendance from '../student-attendance';
import { CreateStudentAttendanceVal } from './student-attendance-val';

const StudentAttendanceService = {
  create: async (request: RequestContract, userId: string) => {
    // TODO: Add teacher is hrt check
    const { data, date } = await request.validate(CreateStudentAttendanceVal);
    const year = await AcademicYearService.getActive();

    await transactLocalized(async (trx) => {
      for (let i = 0; i < data.length; i++) {
        const promises: Promise<any>[] = [];
        promises.push(
          StudentAttendance.updateOrCreate(
            {
              student_id: data[i].student_id,
              date: date.toISODate() as any,
              academic_year_id: year.id,
            },
            {
              user_id: userId,
              late_reason: data[i].late_reason || '',
              status: data[i].status,
            },
            { client: trx }
          )
        );
        await Promise.all(promises);
      }
    });
  },
};

export default StudentAttendanceService;
