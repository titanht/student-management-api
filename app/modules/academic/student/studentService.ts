import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import AcademicYearService from '../academicYear/academicYearService';
import GradeStudentRepo from '../gradeStudent/gradeStudentRepo';
import Student from './student';
import StudentRepo from './studentRepo';

export default class StudentService extends Service<Student> {
  constructor() {
    super(new StudentRepo());
  }

  // TODO: unit test, transactify
  async create(createData: any, _auth?: AuthContract) {
    const year = await AcademicYearService.getActive();
    const { grade_id, ...rest } = createData;
    const student = await this.repo.createModel(rest);
    await new GradeStudentRepo().updateOrCreateModel(
      { grade_id, student_id: student.id, academic_year_id: year.id },
      {
        grade_id,
        student_id: student.id,
        academic_year_id: year.id,
      }
    );

    return student;
  }
}
