import Service from 'app/modules/_shared/service';
import SubjectService from '../marklist/subject/subjectService';
import Grade from './grade';
import GradeRepo from './gradeRepo';

export default class GradeService extends Service<Grade> {
  constructor(protected subjectService = new SubjectService()) {
    super(new GradeRepo());
  }

  async getGrades() {
    return (await Grade.query()
      .preload('hrt')
      .orderBy('order', 'asc')) as Grade[];
  }

  async getGradeSubjects(gradeId: string) {
    const grade = await Grade.findOrFail(gradeId);

    return this.subjectService.getSubjectsByReport(grade.report_card_template);
  }
}
