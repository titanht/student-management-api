import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import { semesterMap } from 'app/modules/_shared/types';
import { transactify } from 'app/services/utils';
import Quarter from '../../quarter/quarter';
import { CstScore } from '../rcq/rcqService';
import RcsCstRepo from '../rcsCst/rcsCstRepo';
import ReportCardService from '../reportCardService';
import Rcs from './rcs';
import RcsRepo from './rcsRepo';
import RcqRepo from '../rcq/rcqRepo';
import GradeService from 'app/modules/academic/grade/gradeService';
import GradeStudentService from 'app/modules/academic/gradeStudent/gradeStudentService';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import SemesterService from '../../semester/semesterService';
import CstService from '../../cst/cstService';

export default class RcsService extends ReportCardService<Rcs> {
  protected rcsCstRepo: RcsCstRepo;

  constructor(
    protected gradeService = new GradeService(),
    protected gsService = new GradeStudentService(),
    protected semesterService = new SemesterService(),
    protected cstService = new CstService()
  ) {
    super(new RcsRepo());
    this.rcsCstRepo = new RcsCstRepo();
  }

  async fetchStudentReport(gradeStudentId: string) {
    const report = await (this.repo as RcsRepo).fetchReportCard(gradeStudentId);

    return this.formatStudentReport(report);
  }

  formatStudentReport(data: any[]) {
    const mappedData = {
      Total: {},
      Average: {},
      Rank: {},
    };

    data.forEach((item) => {
      const {
        total_score: totalScore,
        average,
        rank,
        semester: { semester },
      } = item;

      mappedData.Total[semesterMap[semester]] = totalScore;
      mappedData.Average[semesterMap[semester]] = average;
      mappedData.Rank[semesterMap[semester]] = rank;
    });

    return mappedData;
  }

  async updateRank(gradeId: string, semesterId: string) {
    await transactify(async () => {
      const yr = await AcademicYear.getActiveYear();
      const rcss = await (this.repo as RcsRepo).fetchGradeSemesterCards(
        gradeId,
        semesterId,
        yr.id
      );
      const rankMap = this.calculateRank(rcss);
      await (this.repo as RcsRepo).updateRank(rcss as Rcs[], rankMap);
    });
  }

  async getDevisor(gradeStudentId: string, semesterId: string) {
    const quarterIds = (
      await Quarter.query().where('semester_id', semesterId)
    ).map((i) => i.id);
    let smlCount = 0;

    const rcqRepo = new RcqRepo();
    for (let i = 0; i < quarterIds.length; i++) {
      const quarterSmlQuery = await rcqRepo.getQuarterSml(
        gradeStudentId,
        quarterIds[i]
      );

      if (
        quarterSmlQuery &&
        this.filterEmptySml(this.filterEmptyEvaluation(quarterSmlQuery)).length
      ) {
        smlCount++;
      }
    }

    return smlCount;
  }

  async generateReportStudent(gradeStudentId: string, semesterId: string) {
    const smlQuery = await (this.repo as RcsRepo).getSemesterSml(
      gradeStudentId,
      semesterId
    );
    const smlData = this.filterEmptySml(this.filterEmptyEvaluation(smlQuery));
    // console.log(smlData.length);

    // console.log(JSON.stringify(smlData, null, 2));
    if (smlData.length) {
      const devisor = await this.getDevisor(gradeStudentId, semesterId);
      // console.log(devisor);
      const cstMap = this.extractCstScore(smlData);
      const totalMark = this.addMarks(smlData, devisor);

      const rcs = await Rcs.updateOrCreate(
        {
          grade_student_id: gradeStudentId,
          semester_id: semesterId,
        },
        {
          subject_count: cstMap.length,
          total_score: totalMark,
          average: cstMap.length ? totalMark / cstMap.length : 0,
          rank: null,
          finalize_date: null,
          finalized: false,
        }
      );

      await this.rcsCstRepo.createOrUpdate(cstMap, rcs.id);
    }
  }

  async generateReport(gradeStudentId: string, semesterId: string) {
    await transactify(() =>
      this.generateReportStudent(gradeStudentId, semesterId)
    );
  }

  async generateGradeReport(gradeId: string, semesterId: string) {
    const gsIds = (
      await this.gsService.currentRegisteredActiveGradeStudents(gradeId)
    ).map((item) => item.id);

    await transactify(async () => {
      for (let i = 0; i < gsIds.length; i++) {
        await this.generateReportStudent(gsIds[i], semesterId);
      }
    });
  }

  extractCstScore(semesterCstSmlData: Record<string, any>[]): CstScore[] {
    return semesterCstSmlData.map((item) => ({
      id: item.id,
      score: this.addMarks([item], 2),
    }));
  }

  // TODO: Add unit test
  async getSemesterGrade(gradeId: string, semesterId: string) {
    const year = await AcademicYearService.getActive();
    const grade = await this.gradeService.findOne(gradeId);
    const semester = await this.semesterService.findOne(semesterId);

    const rcss = await Rcs.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
      })
      .where('semester_id', semesterId);

    const students = await this.gsService.currentRegisteredActiveStudents(
      gradeId
    );

    const csts = await this.cstService.getGradeSemesterCST(gradeId, semesterId);

    return { grade, semester, rcss, students, csts };
  }
}
