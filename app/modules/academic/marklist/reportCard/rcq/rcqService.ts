// import Database from '@ioc:Adonis/Lucid/Database';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import GradeService from 'app/modules/academic/grade/gradeService';
import GradeStudentService from 'app/modules/academic/gradeStudent/gradeStudentService';
import { quarterMap } from 'app/modules/_shared/types';
import { transactify } from 'app/services/utils';
import AcademicYear from '../../../academicYear/academicYear';
import CstService from '../../cst/cstService';
import QuarterService from '../../quarter/quarterService';
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

  constructor(
    protected gradeService = new GradeService(),
    protected quarterService = new QuarterService(),
    protected gsService = new GradeStudentService(),
    protected cstService = new CstService()
  ) {
    super(new RcqRepo());
    this.rcqCstRepo = new RcqCstRepo();
  }

  async fetchStudentReport(gradeStudentId: string) {
    const report = await (this.repo as RcqRepo).fetchReportCard(gradeStudentId);

    return report;
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

  async generateReportStudent(
    gsId: string,
    quarterId: string,
    markMap: Record<string, number>
  ) {
    const subjectCount = Object.keys(markMap).length;

    if (subjectCount) {
      const totalMark = Object.values(markMap).reduce((a, b) => a + b);
      const rcq = await Rcq.updateOrCreate(
        {
          grade_student_id: gsId,
          quarter_id: quarterId,
        },
        {
          subject_count: subjectCount,
          total_score: totalMark,
          average: totalMark / subjectCount,
          rank: null,
          finalize_date: null,
          finalized: false,
        }
      );
      await this.rcqCstRepo.createOrUpdate(markMap, rcq.id);
    }
  }

  async generateGradeReport(gradeId: string, quarterId) {
    const year = await AcademicYearService.getActive();
    await Rcq.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
      })
      .where('quarter_id', quarterId)
      .delete();

    const { mark } = await this.getCstMap(gradeId, quarterId);

    const gradeStudentIds = (
      await this.gsService.currentRegisteredActiveGradeStudents(gradeId)
    ).map((item) => item.id);

    // console.log({ gradeStudentIds });

    await transactify(async () => {
      for (let i = 0; i < gradeStudentIds.length; i++) {
        const gsId = gradeStudentIds[i];
        await this.generateReportStudent(gsId, quarterId, mark[gsId] || {});
      }
    });
  }

  async getCstMap(gradeId: string, quarterId: string) {
    const year = await AcademicYearService.getActive();

    const rcqs = await Rcq.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
      })
      .where('quarter_id', quarterId);

    const students = await this.gsService.currentRegisteredActiveStudents(
      gradeId
    );

    const csts = await this.cstService.getGradeQuarterCST(gradeId, quarterId);
    const marklistMap = this.parseQuarterMarkList(students, csts, rcqs);
    const mark = this.calculateMark(marklistMap);

    const cstsAll = await this.cstService.getGradeQuarterCSTAll(
      gradeId,
      quarterId
    );
    const marklistMapAll = this.parseQuarterMarkList(students, cstsAll, rcqs);
    const markAll = this.calculateMark(marklistMapAll);

    return { csts, marklistMap, mark, students, rcqs, cstsAll, markAll };
  }

  // TODO: Add unit test
  async getQuarterGrade(gradeId: string, quarterId: string) {
    const grade = await this.gradeService.findOne(gradeId);
    const quarter = await this.quarterService.findOne(quarterId);

    const {
      cstsAll: csts,
      marklistMap,
      markAll: mark,
      students,
      rcqs,
    } = await this.getCstMap(gradeId, quarterId);

    return {
      marklistMap,
      mark,
      csts,
      grade,
      quarter,
      rcqs,
      students,
    };
  }
}
