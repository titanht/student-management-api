import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import GradeStudentRepo from 'app/modules/academic/gradeStudent/gradeStudentRepo';
import { semesterMap } from 'app/modules/_shared/types';
import { transactify } from 'app/services/utils';
import Quarter from '../../quarter/quarter';
import { CstScore } from '../rcq/rcqService';
import RcsCstRepo from '../rcsCst/rcsCstRepo';
import ReportCardService from '../reportCardService';
import Rcs from './rcs';
import RcsRepo from './rcsRepo';
import RcqRepo from '../rcq/rcqRepo';

export default class RcsService extends ReportCardService<Rcs> {
  protected rcsCstRepo: RcsCstRepo;

  constructor() {
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
    const gsIds = await new GradeStudentRepo().fetchGradeStudents(gradeId);

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
}
