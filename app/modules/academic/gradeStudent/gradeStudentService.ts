import Service from 'app/modules/_shared/service';
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
}
