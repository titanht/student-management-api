import EvaluationTypeService from 'app/modules/academic/marklist/evaluationType/evaluationTypeService';
import QuarterService from 'app/modules/academic/marklist/quarter/quarterService';
import AcademicYearService from '../../academic/academicYear/academicYearService';
import GradeService from '../../academic/grade/gradeService';

export default class GlobalService {
  constructor(
    protected gradeService = new GradeService(),
    protected academicService = new AcademicYearService(),
    protected evalTypeService = new EvaluationTypeService(),
    protected quarterService = new QuarterService()
  ) {}

  async getGlobal() {
    const years = await this.academicService.getYears();
    const activeYear = await this.academicService.active();
    const grades = await this.gradeService.getGrades();
    const evaluationTypes = await this.evalTypeService.findAll();
    const quarters = await this.quarterService.findAll();

    return { activeYear, years, evaluationTypes, quarters, grades };
  }
}
