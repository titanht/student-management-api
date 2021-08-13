import GradeStudentRepo from 'app/modules/academic/gradeStudent/gradeStudentRepo';
import { transactify } from 'app/services/utils';
import Quarter from '../../quarter/quarter';
import RcqRepo from '../rcq/rcqRepo';
import { CstScore } from '../rcq/rcqService';
import RcyCstRepo from '../rcyCst/rcyCstRepo';
import ReportCardService from '../reportCardService';
import Rcy from './rcy';
import RcyRepo from './rcyRepo';

export default class RcyService extends ReportCardService<Rcy> {
  protected rcyCstRepo: RcyCstRepo;

  constructor() {
    super(new RcyRepo());
    this.rcyCstRepo = new RcyCstRepo();
  }

  async fetchStudentReport(gradeStudentId: string) {
    const report = await (this.repo as RcyRepo).fetchReportCard(gradeStudentId);

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
        academicYear: { year },
      } = item;

      mappedData.Total[year] = totalScore;
      mappedData.Average[year] = average;
      mappedData.Rank[year] = rank;
    });

    return mappedData;
  }

  async updateRank(gradeId: string, academicYearId: string) {
    await transactify(async () => {
      const rcys = await (this.repo as RcyRepo).fetchGradeYearCards(
        gradeId,
        academicYearId
      );
      const rankMap = this.calculateRank(rcys);
      await (this.repo as RcyRepo).updateRank(rcys as Rcy[], rankMap);
    });
  }

  async getDevisor(gradeStudentId: string) {
    const quarterIds = (await Quarter.all()).map((item) => item.id);
    const rcqRepo = new RcqRepo();
    let smlCount = 0;

    for (let i = 0; i < quarterIds.length; i++) {
      const quarterQuery = await rcqRepo.getQuarterSml(
        gradeStudentId,
        quarterIds[i]
      );

      if (
        quarterQuery &&
        this.filterEmptySml(this.filterEmptyEvaluation(quarterQuery)).length
      ) {
        smlCount++;
      }
    }

    return smlCount;
  }

  async generateReportStudent(gradeStudentId: string, yearId: string) {
    const smlQuery = await (this.repo as RcyRepo).getYearSml(
      gradeStudentId,
      yearId
    );
    const smlData = this.filterEmptySml(this.filterEmptyEvaluation(smlQuery));

    // TODO: test
    if (smlData.length) {
      const devisor = await this.getDevisor(gradeStudentId);
      // console.log(devisor);
      const cstMap = this.extractCstScore(smlData);
      const totalMark = this.addMarks(smlData, devisor);

      const rcq = await Rcy.updateOrCreate(
        {
          grade_student_id: gradeStudentId,
          academic_year_id: yearId,
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
      await this.rcyCstRepo.createOrUpdate(cstMap, rcq.id);
    }
  }

  async generateReport(gradeStudentId: string, yearId: string) {
    await transactify(() => this.generateReportStudent(gradeStudentId, yearId));
  }

  async generateReportGrade(gradeId: string, yearId: string) {
    const gsIds = await new GradeStudentRepo().fetchGradeStudents(gradeId);

    await transactify(async () => {
      for (let i = 0; i < gsIds.length; i++) {
        await this.generateReportStudent(gsIds[i], yearId);
      }
    });
  }

  extractCstScore(yearCstSmlData: Record<string, any>[]): CstScore[] {
    return yearCstSmlData.map((item) => ({
      id: item.id,
      score: this.addMarks([item], 4),
    }));
  }
}
