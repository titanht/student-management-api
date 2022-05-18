import Service from 'app/modules/_shared/service';
import { StudentStatus } from 'app/modules/_shared/types';
import AcademicYear from '../academicYear/academicYear';
import AcademicYearService from '../academicYear/academicYearService';
import Student from '../student/student';
import GradeStudent from './gradeStudent';
import GradeStudentRepo from './gradeStudentRepo';

export default class GradeStudentService extends Service<GradeStudent> {
  constructor() {
    super(new GradeStudentRepo());
  }

  // TODO: Unit test
  async changeStudentGrade(studentId: string, gradeId: string) {
    const year = await AcademicYearService.getActive();

    return this.repo.updateOrCreateModel(
      {
        student_id: studentId,
        academic_year_id: year.id,
      },
      {
        grade_id: gradeId,
        student_id: studentId,
        academic_year_id: year.id,
      }
    );
  }

  async changeGrade(id: string, gradeId: string) {
    return this.repo.updateModel(id, {
      grade_id: gradeId,
    });
  }

  async promoteGrade(studentIds: string[], gradeId: string, yearId: string) {
    return (this.repo as GradeStudentRepo).promoteGrade(
      studentIds,
      gradeId,
      yearId
    );
  }

  async currentStudents(gradeId: string) {
    const year = await AcademicYearService.getActive();

    return Student.query()
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name');
  }

  async currentRegisteredStudents(gradeId: string) {
    const year = await AcademicYearService.getActive();

    return Student.query()
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .whereHas('registrationPayments', (regBuilder) => {
        regBuilder.where('academic_year_id', year.id);
      })
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name');
  }

  async currentRegisteredActiveStudents(gradeId: string) {
    const year = await AcademicYearService.getActive();

    return Student.query()
      .whereHas('gradeStudents', (gsBuilder) => {
        gsBuilder
          .where('academic_year_id', year.id)
          .where('grade_id', gradeId)
          .whereHas('student', (studentBuilder) => {
            studentBuilder.where('status', StudentStatus.Active);
          });
      })
      .whereHas('registrationPayments', (regBuilder) => {
        regBuilder.where('academic_year_id', year.id);
      })
      .preload('gradeStudents', (gsBuilder) => {
        gsBuilder.where('academic_year_id', year.id).where('grade_id', gradeId);
      })
      .orderBy('first_name');
  }

  async currentRegisteredActiveGradeStudents(gradeId: string, yearId?: string) {
    if (!yearId) {
      yearId = (await AcademicYear.getActiveYear()).id;
    }

    const gradeStudents = await GradeStudent.query()
      .whereHas('student', (studentBuilder) => {
        studentBuilder
          .whereHas('registrationPayments', (regBuilder) => {
            regBuilder.where('academic_year_id', yearId!);
          })
          .where('status', StudentStatus.Active);
      })
      .where('academic_year_id', yearId!)
      .where('grade_id', gradeId);

    return gradeStudents;
  }
}
