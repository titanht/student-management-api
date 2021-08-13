import { Repo } from 'app/modules/_shared/repo';
import AcademicYear from '../academicYear/academicYear';
import GradeStudent from './gradeStudent';

export default class GradeStudentRepo extends Repo<GradeStudent> {
  constructor() {
    super(GradeStudent);
  }

  async promoteGrade(studentIds: string[], gradeId: string, yearId: string) {
    const promises: Promise<any>[] = [];

    studentIds.forEach((studentId) => {
      const data = {
        student_id: studentId,
        grade_id: gradeId,
        academic_year_id: yearId,
      };
      promises.push(this.updateOrCreateModel(data, data));
    });

    await Promise.all(promises);
  }

  async fetchGradeStudents(gradeId: string) {
    const year = await AcademicYear.getActiveYear();
    const gradeStudents = await this.model
      .query()
      .where('academic_year_id', year.id)
      .where('grade_id', gradeId);

    return this.pluck(gradeStudents);
  }

  async fetchStudentReport(gradeStudentId: string) {
    const gs = await GradeStudent.query()
      .preload('student')
      .preload('academicYear')
      .preload('grade')
      .where('id', gradeStudentId)
      .firstOrFail();

    const {
      student: { first_name, father_name, grand_father_name, gender, age },
      grade,
      academicYear: { year },
    } = gs.serialize();

    return {
      name: `${first_name} ${father_name || ''} ${grand_father_name || ''}`,
      sex: gender,
      grade: grade.name,
      promotedTo: '',
      year,
      age,
    };
  }
}
