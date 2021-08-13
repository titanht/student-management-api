// import Database from '@ioc:Adonis/Lucid/Database';
import GradeStudentRepo from 'app/modules/academic/gradeStudent/gradeStudentRepo';
import { quarterMap } from 'app/modules/_shared/types';
import { transactify } from 'app/services/utils';
import AcademicYear from '../../../academicYear/academicYear';
import RcqCstRepo from '../rcqCst/rcqCstRepo';
import ReportCardService from '../reportCardService';
import Rcq from './rcq';
import RcqRepo from './rcqRepo';

export type CstScore = {
  id: string;
  score: number;
};

export default class RcqService extends ReportCardService<Rcq> {
  protected rcqCstRepo: RcqCstRepo;

  constructor() {
    super(new RcqRepo());
    this.rcqCstRepo = new RcqCstRepo();
  }

  async fetchStudentReport(gradeStudentId: string) {
    const report = await (this.repo as RcqRepo).fetchReportCard(gradeStudentId);
    // console.log(report);

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
        quarter: { quarter },
      } = item;

      mappedData.Total[quarterMap[quarter]] = totalScore;
      mappedData.Average[quarterMap[quarter]] = average;
      mappedData.Rank[quarterMap[quarter]] = rank;
    });

    return mappedData;
  }

  async updateRank(gradeId: string, quarterId: string) {
    await transactify(async () => {
      const year = await AcademicYear.getActiveYear();
      const rcqs = await (this.repo as RcqRepo).fetchGradeQuarterCards(
        gradeId,
        quarterId,
        year.id
      );
      const rankMap = this.calculateRank(rcqs);
      await (this.repo as RcqRepo).updateRank(rcqs as Rcq[], rankMap);
    });
  }

  async generateReportStudent(gradeStudentId: string, quarterId: string) {
    const smlQuery = await (this.repo as RcqRepo).getQuarterSml(
      gradeStudentId,
      quarterId
    );
    const smlData = this.filterEmptySml(this.filterEmptyEvaluation(smlQuery));
    // console.log(smlData.length);
    // console.log(JSON.stringify(smlData, null, 2));

    if (smlData.length) {
      const cstMap = this.extractCstScore(smlData);
      const totalMark = this.addMarks(smlData);

      const rcq = await Rcq.updateOrCreate(
        {
          grade_student_id: gradeStudentId,
          quarter_id: quarterId,
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
      await this.rcqCstRepo.createOrUpdate(cstMap, rcq.id);
    }
  }

  async generateReport(gradeStudentId: string, quarterId: string) {
    await transactify(() =>
      this.generateReportStudent(gradeStudentId, quarterId)
    );
  }

  async generateGradeReport(gradeId: string, quarterId) {
    const gradeStudentIds = await new GradeStudentRepo().fetchGradeStudents(
      gradeId
    );

    await transactify(async () => {
      for (let i = 0; i < gradeStudentIds.length; i++) {
        const gsId = gradeStudentIds[i];
        await this.generateReportStudent(gsId, quarterId);
      }
    });
  }

  extractCstScore(quarterCstSmlData: Record<string, any>[]): CstScore[] {
    return quarterCstSmlData.map((item) => ({
      id: item.id,
      score: this.addMarks([item]),
    }));
  }
}
