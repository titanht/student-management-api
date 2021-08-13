import Model from 'app/modules/_shared/model';
import { Repo } from 'app/modules/_shared/repo';
import Service from 'app/modules/_shared/service';
import AcademicYear from '../../academicYear/academicYear';
import GradeStudent from '../../gradeStudent/gradeStudent';
import Cst from '../cst/cst';
import Rc from './rc';
import Rcq from './rcq/rcq';
import Rcs from './rcs/rcs';
import Rcy from './rcy/rcy';

// Map {reportId, ranking}
export type RankMap = Record<string, number>;

export default class ReportCardService<T extends Model> extends Service<T> {
  constructor(repo: Repo<T>) {
    super(repo);
  }

  filterEmptyEvaluation(cstData: any[]) {
    return cstData.filter((cst) => cst.evaluationMethods.length);
  }

  filterEmptySml(cstData: any[]) {
    return cstData.filter(({ evaluationMethods }) =>
      evaluationMethods.some((em) => em.smls.length)
    );
  }

  calculateRank(reportCards: Partial<Rc>[]): RankMap {
    const rcSorted = reportCards.sort(
      (a, b) => (b.average as number) - (a.average as number)
    );
    let rank = 0;
    const rankMap = {};
    rcSorted.forEach((rc, i) => {
      if (i === 0) {
        rank++;
      } else if (rc.average !== rcSorted[i - 1].average) {
        rank = i + 1;
      }
      rankMap[rc.id as string] = rank;
    });

    return rankMap;
  }

  addMarks(cstSmlData: Record<string, any>[], factor: number = 1): number {
    let marks = 0;

    cstSmlData.forEach((cst) => {
      cst.evaluationMethods.forEach((evalMethod) => {
        marks += evalMethod.smls.length ? evalMethod.smls[0].score : 0;
      });
    });

    return marks / factor;
  }

  parseQuarterData(csts: any, studentMap: object) {
    csts.forEach((cst) => {
      const {
        subject: { subject },
        rcqCsts,
      } = cst;
      rcqCsts.forEach((rcqCst) => {
        if (rcqCst) {
          const {
            score,
            rcq: {
              quarter,
              gradeStudent: { student },
            },
          } = rcqCst;

          const studentKey = student.id_number;
          if (!studentMap[studentKey]) {
            studentMap[studentKey] = {
              quarter: {},
              semester: {},
              year: {},
            };
          }
          if (!studentMap[studentKey].quarter[quarter.quarter]) {
            studentMap[studentKey].quarter[quarter.quarter] = {};
          }
          if (!studentMap[studentKey].quarter[quarter.quarter][subject]) {
            studentMap[studentKey].quarter[quarter.quarter][subject] = score;
          }
        }
      });
    });
  }

  async fetchQuarterData(yearId, gradeId, studentMap) {
    const csts = (
      await Cst.query()
        .preload('subject')
        .where('grade_id', gradeId)
        .preload('rcqCsts', (rcqCstBuilder) => {
          rcqCstBuilder
            .whereHas('rcq', (rcqBuilder) => {
              rcqBuilder.whereHas('gradeStudent', (gsBuilder) => {
                gsBuilder
                  .where('grade_id', gradeId)
                  .where('academic_year_id', yearId);
              });
            })
            .preload('rcq', (rcqBuilder) => {
              rcqBuilder
                .preload('gradeStudent', (gsBuilder) => {
                  gsBuilder.preload('student');
                })
                .preload('quarter');
            });
        })
        .where('academic_year_id', yearId)
    ).map((i) => i.serialize());
    // .slice(0, 1);

    // require('fs').writeFileSync(`${__dirname}/cst.json`, JSON.stringify(csts));

    this.parseQuarterData(csts, studentMap);
  }

  async fetchQuarterRank(yearId, gradeId, studentMap) {
    const rcqs = (
      await Rcq.query()
        .whereHas('gradeStudent', (gsBuilder) => {
          gsBuilder
            .where('academic_year_id', yearId)
            .where('grade_id', gradeId);
        })
        .preload('gradeStudent', (gsBuilder) => {
          gsBuilder.preload('student');
        })
        .preload('quarter')
    ).map((i) => i.serialize());
    rcqs.forEach((rcq) => {
      const {
        gradeStudent: { student },
        quarter: { quarter },
        average,
        total_score: totalScore,
        rank,
      } = rcq;
      const studentKey = student.id_number;
      if (studentMap[studentKey] && studentMap[studentKey].quarter[quarter]) {
        studentMap[studentKey].quarter[quarter] = {
          ...studentMap[studentKey].quarter[quarter],
          average,
          totalScore,
          rank,
        };
      }
    });
  }

  parseSemesterData(csts: any, studentMap: object) {
    csts.forEach((cst) => {
      const {
        subject: { subject },
        rcsCsts,
      } = cst;
      rcsCsts.forEach((rcsCst) => {
        if (rcsCst) {
          const {
            score,
            rcs: {
              semester,
              gradeStudent: { student },
            },
          } = rcsCst;

          const studentKey = student.id_number;
          if (!studentMap[studentKey]) {
            studentMap[studentKey] = {
              quarter: {},
              semester: {},
              year: {},
            };
          }
          if (!studentMap[studentKey].semester[semester.semester]) {
            studentMap[studentKey].semester[semester.semester] = {};
          }
          if (!studentMap[studentKey].semester[semester.semester][subject]) {
            studentMap[studentKey].semester[semester.semester][subject] = score;
          }
        }
      });
    });
  }

  async fetchSemesterData(yearId, gradeId, studentMap) {
    const csts = (
      await Cst.query()
        .preload('subject')
        .where('grade_id', gradeId)
        .preload('rcsCsts', (rcsCstBuilder) => {
          rcsCstBuilder
            .whereHas('rcs', (rcsBuilder) => {
              rcsBuilder.whereHas('gradeStudent', (gsBuilder) => {
                gsBuilder
                  .where('grade_id', gradeId)
                  .where('academic_year_id', yearId);
              });
            })
            .preload('rcs', (rcsBuilder) => {
              rcsBuilder
                .preload('gradeStudent', (gsBuilder) => {
                  gsBuilder.preload('student');
                })
                .preload('semester');
            });
        })
        .where('academic_year_id', yearId)
    ).map((i) => i.serialize());
    // .slice(0, 1);

    // require('fs').writeFileSync(`${__dirname}/cst.json`, JSON.stringify(csts));

    this.parseSemesterData(csts, studentMap);
  }

  async fetchSemesterRank(yearId, gradeId, studentMap) {
    const rcss = (
      await Rcs.query()
        .whereHas('gradeStudent', (gsBuilder) => {
          gsBuilder
            .where('academic_year_id', yearId)
            .where('grade_id', gradeId);
        })
        .preload('gradeStudent', (gsBuilder) => {
          gsBuilder.preload('student');
        })
        .preload('semester')
    ).map((i) => i.serialize());
    rcss.forEach((rcs) => {
      const {
        gradeStudent: { student },
        semester: { semester },
        average,
        total_score: totalScore,
        rank,
      } = rcs;
      const studentKey = student.id_number;
      if (studentMap[studentKey] && studentMap[studentKey].semester[semester]) {
        studentMap[studentKey].semester[semester] = {
          ...studentMap[studentKey].semester[semester],
          average,
          totalScore,
          rank,
        };
      }
    });
  }

  parseYearData(csts: any, studentMap: object) {
    csts.forEach((cst) => {
      const {
        subject: { subject },
        rcyCsts,
      } = cst;
      rcyCsts.forEach((rcyCst) => {
        if (rcyCst) {
          const {
            score,
            rcy: {
              gradeStudent: { student },
            },
          } = rcyCst;

          const studentKey = student.id_number;
          if (!studentMap[studentKey]) {
            studentMap[studentKey] = {
              quarter: {},
              semester: {},
              year: {},
            };
          }
          if (!studentMap[studentKey].year) {
            studentMap[studentKey].year = {};
          }
          if (!studentMap[studentKey].year[subject]) {
            studentMap[studentKey].year[subject] = score;
          }
        }
      });
    });
  }

  async fetchYearData(yearId, gradeId, studentMap) {
    const csts = (
      await Cst.query()
        .preload('subject')
        .where('grade_id', gradeId)
        .preload('rcyCsts', (rcyCstBuilder) => {
          rcyCstBuilder
            .whereHas('rcy', (rcyBuilder) => {
              rcyBuilder.whereHas('gradeStudent', (gsBuilder) => {
                gsBuilder
                  .where('grade_id', gradeId)
                  .where('academic_year_id', yearId);
              });
            })
            .preload('rcy', (rcyBuilder) => {
              rcyBuilder
                .preload('gradeStudent', (gsBuilder) => {
                  gsBuilder.preload('student');
                })
                .preload('academicYear');
            });
        })
        .where('academic_year_id', yearId)
    ).map((i) => i.serialize());
    // .slice(0, 1);

    // require('fs').writeFileSync(`${__dirname}/cst.json`, JSON.stringify(csts));

    this.parseYearData(csts, studentMap);
  }

  async fetchYearRank(yearId, gradeId, studentMap) {
    const rcys = (
      await Rcy.query()
        .whereHas('gradeStudent', (gsBuilder) => {
          gsBuilder
            .where('academic_year_id', yearId)
            .where('grade_id', gradeId);
        })
        .preload('gradeStudent', (gsBuilder) => {
          gsBuilder.preload('student');
        })
    )
      // .preload('academicYear')
      .map((i) => i.serialize());
    rcys.forEach((rcy) => {
      const {
        gradeStudent: { student },
        // academicYear: { year },
        average,
        total_score: totalScore,
        rank,
      } = rcy;
      const studentKey = student.id_number;
      if (studentMap[studentKey]) {
        studentMap[studentKey].year = {
          ...studentMap[studentKey].year,
          average,
          totalScore,
          rank,
        };
      }
    });
  }

  async fetchStudentMap(gradeId, yearId) {
    const gses = (
      await GradeStudent.query()
        .where('academic_year_id', yearId)
        .where('grade_id', gradeId)
        .preload('student')
    ).map((i) => i.serialize());

    const studentIdMap = {};
    gses.forEach((gs) => {
      const {
        student: { id_number, first_name, father_name, grand_father_name },
      } = gs;
      studentIdMap[id_number] = `${first_name} ${father_name || ''} ${
        grand_father_name || ''
      }`;
    });

    return studentIdMap;
  }

  // TODO: Refactor
  async generateRoster(gradeId: string) {
    const yearId = (await AcademicYear.getActiveYear()).id;
    const studentRosterMap = {};

    await this.fetchQuarterData(yearId, gradeId, studentRosterMap);
    await this.fetchQuarterRank(yearId, gradeId, studentRosterMap);

    await this.fetchSemesterData(yearId, gradeId, studentRosterMap);
    await this.fetchSemesterRank(yearId, gradeId, studentRosterMap);

    await this.fetchYearData(yearId, gradeId, studentRosterMap);
    await this.fetchYearRank(yearId, gradeId, studentRosterMap);

    const studentIdMap = await this.fetchStudentMap(gradeId, yearId);
    // console.log(csts[0].rcqCsts[0]);
    // console.log(studentRosterMap);

    // require('fs').writeFileSync(
    //   `${__dirname}/stud.json`,
    //   JSON.stringify(studentRosterMap)
    // );

    return { studentRosterMap, studentIdMap };
  }
}
