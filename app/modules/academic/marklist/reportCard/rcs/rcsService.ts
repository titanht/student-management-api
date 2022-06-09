import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import { semesterMap } from 'app/modules/_shared/types';
import { transactify } from 'app/services/utils';
import Quarter from '../../quarter/quarter';
import RcsCstRepo from '../rcsCst/rcsCstRepo';
import ReportCardService from '../reportCardService';
import Rcs from './rcs';
import RcsRepo from './rcsRepo';
import GradeService from 'app/modules/academic/grade/gradeService';
import GradeStudentService from 'app/modules/academic/gradeStudent/gradeStudentService';
import AcademicYearService from 'app/modules/academic/academicYear/academicYearService';
import SemesterService from '../../semester/semesterService';
import CstService from '../../cst/cstService';
import Rcq from '../rcq/rcq';

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

  async generateReportStudent(
    gsId: string,
    semesterId: string,
    markMap: Record<string, number>
  ) {
    const subjectCount = Object.keys(markMap).length;

    if (subjectCount) {
      const totalMark = Object.values(markMap).reduce((a, b) => a + b);
      const rcs = await Rcs.updateOrCreate(
        {
          grade_student_id: gsId,
          semester_id: semesterId,
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
      await this.rcsCstRepo.createOrUpdate(markMap, rcs.id);
    }
  }

  async generateGradeReport(gradeId: string, semesterId: string) {
    const year = await AcademicYearService.getActive();
    await Rcs.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
      })
      .where('semester_id', semesterId);
    const { mark } = await this.getCstMap(gradeId, semesterId);

    const gsIds = (
      await this.gsService.currentRegisteredActiveGradeStudents(gradeId)
    ).map((item) => item.id);

    await transactify(async () => {
      for (let i = 0; i < gsIds.length; i++) {
        await this.generateReportStudent(
          gsIds[i],
          semesterId,
          mark[gsIds[i]] || {}
        );
      }
    });
  }

  async getCstMap(gradeId: string, semesterId: string) {
    const year = await AcademicYearService.getActive();
    const quarterIds = (
      await Quarter.query().where('semester_id', semesterId)
    ).map((q) => q.id);

    const rcqs = await Rcq.query()
      .whereHas('gradeStudent', (gsBuilder) => {
        gsBuilder.where('grade_id', gradeId).where('academic_year_id', year.id);
      })
      .whereIn('quarter_id', quarterIds);
    const quarters = await Quarter.query()
      .whereIn('id', quarterIds)
      .orderBy('quarter', 'asc');

    const students = await this.gsService.currentRegisteredActiveStudents(
      gradeId
    );
    const gsIds = (
      await this.gsService.currentRegisteredActiveGradeStudents(gradeId)
    ).map((i) => i.id);
    const rcqMap = await this.fetchRcqs(quarterIds, gsIds);

    const csts = await this.cstService.getGradeSemesterCST(gradeId, semesterId);
    const marklistMap = this.parseQuarterMarkList(students, csts, rcqs);
    const mark = this.calculateMark(marklistMap);

    return { csts, marklistMap, mark, students, quarters, rcqMap };
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

    const { csts, marklistMap, mark, students, quarters, rcqMap } =
      await this.getCstMap(gradeId, semesterId);

    return {
      rcqMap,
      quarters,
      marklistMap,
      mark,
      grade,
      semester,
      rcss,
      students,
      csts,
    };
  }
}
