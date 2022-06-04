import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import Service from 'app/modules/_shared/service';
import AcademicYearService from '../academicYear/academicYearService';
import GradeStudentRepo from '../gradeStudent/gradeStudentRepo';
import RcqService from '../marklist/reportCard/rcq/rcqService';
import RcsService from '../marklist/reportCard/rcs/rcsService';
import RcyService from '../marklist/reportCard/rcy/rcyService';
import Student from './student';
import StudentRepo from './studentRepo';

export default class StudentService extends Service<Student> {
  constructor(
    protected rcqService = new RcqService(),
    protected rcsService = new RcsService(),
    protected rcyService = new RcyService()
  ) {
    super(new StudentRepo());
  }

  async findOne(id: string) {
    const activeYear = await AcademicYearService.getActive();
    let rcqs: any = [];
    let rcss: any = [];
    let rcy: any = null;

    const student = await Student.query()
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', activeYear.id).preload('grade');
      })
      .where('id', id)
      .firstOrFail();

    if (student.gradeStudents.length) {
      rcqs = await this.rcqService.fetchStudentReport(
        student.gradeStudents[0].id
      );
      rcss = await this.rcsService.fetchStudentReport(
        student.gradeStudents[0].id
      );
      rcy = await this.rcyService.fetchStudentReport(
        student.gradeStudents[0].id
      );
    }

    return { ...student.serialize(), rcqs, rcss, rcy } as unknown as Student;
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
