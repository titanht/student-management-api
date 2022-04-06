import Service from 'app/modules/_shared/service';
import AcademicYearService from '../academicYear/academicYearService';
import Student from '../student/student';
import GradeStudent from './gradeStudent';
import GradeStudentRepo from './gradeStudentRepo';

export default class GradeStudentService extends Service<GradeStudent> {
  constructor() {
    super(new GradeStudentRepo());
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
}
