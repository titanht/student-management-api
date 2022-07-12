import Model from 'app/modules/_shared/model';
import { Repo } from 'app/modules/_shared/repo';
import Service from 'app/modules/_shared/service';
import { massSerialize } from 'app/services/utils';
import { v4 } from 'uuid';
import AcademicYear from '../../academicYear/academicYear';
import AcademicYearService from '../../academicYear/academicYearService';
import Grade from '../../grade/grade';
import GradeStudent from '../../gradeStudent/gradeStudent';
import Student from '../../student/student';
import Cst from '../cst/cst';
import Quarter from '../quarter/quarter';
import Semester from '../semester/semester';
import Rc from './rc';
import Rcq from './rcq/rcq';
import RcqCst from './rcqCst/rcqCst';
import Rcs from './rcs/rcs';
import RcsCst from './rcsCst/rcsCst';
import Rcy from './rcy/rcy';
import RcyCst from './rcyCst/rcyCst';

// Map {reportId, ranking}
export type RankMap = Record<string, number>;

export default class ReportCardService<T extends Model> extends Service<T> {
  constructor(repo: Repo<T>) {
    super(repo);
  }

  async fetchGradeWithSubject() {
    const grades = await Grade.query()
      .select('id', 'name')
      .orderBy('order', 'asc')
      .preload('csts', (cstBuilder) => {
        cstBuilder
          .select('id', 'subject_id')
          .preload('subject', (subjectBuilder) => {
            subjectBuilder.select('id', 'subject');
          });
      });

    return massSerialize(grades);
  }

  // const parsed = {
  //   "id": "1d060b85-cb85-4d36-8b59-0266648c6a59",
  //   "cst_id": "774aad3f-9ef6-4270-bef0-b0fb507a9fed",
  //   "rcq_id": "0affab33-d07d-4f49-8ad6-46532ace0cbc",
  //   "score": 95,
  //   "cst": {
  //     "subject_id": "7764c877-3f54-49c2-b419-1a6bfaf2497a",
  //     "id": "774aad3f-9ef6-4270-bef0-b0fb507a9fed"
  //   },
  //   "rcq": {
  //     "id": "0affab33-d07d-4f49-8ad6-46532ace0cbc",
  //     "grade_student_id": "2c47cd93-4004-4cdd-a441-01edad2c9b70",
  //     "average": 88.36,
  //     "gradeStudent": {
  //       "id": "2c47cd93-4004-4cdd-a441-01edad2c9b70",
  //       "student_id": "9ebfc341-faa2-4414-8356-de0254dd1078",
  //       "student": {
  //         "id": "9ebfc341-faa2-4414-8356-de0254dd1078",
  //         "first_name": "Bitaniya",
  //         "father_name": "Hintsa",
  //         "grand_father_name": "Nerea",
  //         "gender": "Female"
  //       }
  //     }
  //   }
  // },

  parseNonRankedCsts(csts: any[], reportField: string) {
    const parsedRcqCst: any[] = [];

    csts.forEach((cst) => {
      const scoreMap: Record<
        string,
        { score: number; student: any; quarters: Set<string> }
      > = {};

      cst.evaluationMethods.forEach((evaluationMethod) => {
        evaluationMethod.smls.forEach((sml) => {
          if (!scoreMap[sml.grade_student_id]) {
            scoreMap[sml.grade_student_id] = {
              score: 0,
              student: {
                first_name: sml.gradeStudent.student.first_name,
                father_name: sml.gradeStudent.student.father_name,
                grand_father_name: sml.gradeStudent.student.grand_father_name,
                gender: sml.gradeStudent.student.gender,
              },
              quarters: new Set(),
            };
          }

          scoreMap[sml.grade_student_id].score += sml.score;
          scoreMap[sml.grade_student_id].quarters.add(
            evaluationMethod.quarter_id
          );
        });
      });

      Object.values(scoreMap).forEach((mapItem) => {
        parsedRcqCst.push({
          id: v4(),
          cst_id: cst.id,
          score: mapItem.score / mapItem.quarters.size,
          cst: {
            subject_id: cst.subject_id,
            subject: cst.subject.subject,
          },
          [reportField]: {
            gradeStudent: {
              student: mapItem.student,
            },
          },
        });
      });
    });

    return parsedRcqCst;
  }

  async fetchNonRankedQuarter(
    yearId: string,
    gradeId: string,
    quarterId: string
  ) {
    const csts: any[] = massSerialize(
      await Cst.query()
        .where('grade_id', gradeId)
        .where('academic_year_id', yearId)
        .whereHas('subject', (subBuilder) => {
          subBuilder.where('consider_for_rank', false);
        })
        .preload('subject')
        .preload('evaluationMethods', (emBuilder) => {
          emBuilder
            .where('quarter_id', quarterId)
            .preload('smls', (smlBuilder) => {
              smlBuilder.preload('gradeStudent', (gsBuilder) => {
                gsBuilder.preload('student');
              });
            });
        })
    );

    // return csts;
    return this.parseNonRankedCsts(csts, 'rcq');
  }

  async fetchNonRankedSemester(
    yearId: string,
    gradeId: string,
    semesterId: string
  ) {
    const quarterIds = (
      await Quarter.query().where('semester_id', semesterId)
    ).map((q) => q.id);

    const csts: any[] = massSerialize(
      await Cst.query()
        .where('grade_id', gradeId)
        .where('academic_year_id', yearId)
        .whereHas('subject', (subBuilder) => {
          subBuilder.where('consider_for_rank', false);
        })
        .preload('subject')
        .preload('evaluationMethods', (emBuilder) => {
          emBuilder
            .whereIn('quarter_id', quarterIds)
            .preload('smls', (smlBuilder) => {
              smlBuilder.preload('gradeStudent', (gsBuilder) => {
                gsBuilder.preload('student');
              });
            });
        })
    );

    // return csts;
    return this.parseNonRankedCsts(csts, 'rcs');
  }

  async fetchNonRankedYear(yearId: string, gradeId: string) {
    const quarterIds = (await Quarter.query()).map((q) => q.id);

    const csts: any[] = massSerialize(
      await Cst.query()
        .where('grade_id', gradeId)
        .where('academic_year_id', yearId)
        .whereHas('subject', (subBuilder) => {
          subBuilder.where('consider_for_rank', false);
        })
        .preload('subject')
        .preload('evaluationMethods', (emBuilder) => {
          emBuilder
            .whereIn('quarter_id', quarterIds)
            .preload('smls', (smlBuilder) => {
              smlBuilder.preload('gradeStudent', (gsBuilder) => {
                gsBuilder.preload('student');
              });
            });
        })
    );

    // return csts;
    return this.parseNonRankedCsts(csts, 'rcy');
  }

  async fetchGradeReport(
    {
      quarterIds,
      semesterIds,
      yearId,
    }: { quarterIds: string[]; semesterIds: string[]; yearId: string },
    gradeId: string
  ) {
    const promises: Promise<any>[] = [];
    const quarterReports: Record<string, any[]> = {};
    const quarterRcqCsts: Record<string, any[]> = {};
    const semesterReports: Record<string, any[]> = {};
    const semesterRcsCsts: Record<string, any[]> = {};
    let yearReports: any;
    let yearRcyCsts: any[] = [];

    quarterIds.forEach((quarterId) => {
      promises.push(
        Rcq.query()
          .select('id', 'grade_student_id', 'average')
          .where('quarter_id', quarterId)
          .preload('gradeStudent', (gsBuilder) => {
            gsBuilder
              .select('id', 'student_id')
              .preload('student', (studentBuilder) => {
                studentBuilder.select(
                  'id',
                  'first_name',
                  'father_name',
                  'grand_father_name',
                  'gender'
                );
              });
          })
          .whereHas('gradeStudent', (gsBuilder) => {
            gsBuilder
              .where('grade_id', gradeId)
              .where('academic_year_id', yearId);
          })
          .then((rcq) => {
            quarterReports[quarterId] = rcq;
          })
      );
    });

    quarterIds.forEach((quarterId) => {
      promises.push(
        RcqCst.query()
          .select('id', 'cst_id', 'rcq_id', 'score')
          .preload('cst', (cstBuilder) => {
            cstBuilder.select('subject_id');
          })
          .preload('rcq', (rcqBuilder) => {
            rcqBuilder
              .select('id', 'grade_student_id', 'average')
              .preload('gradeStudent', (gsBuilder) => {
                gsBuilder
                  .select('id', 'student_id')
                  .preload('student', (studentBuilder) => {
                    studentBuilder.select(
                      'id',
                      'first_name',
                      'father_name',
                      'grand_father_name',
                      'gender'
                    );
                  });
              });
          })
          .whereHas('rcq', (rcqBuilder) => {
            rcqBuilder
              .where('quarter_id', quarterId)
              .whereHas('gradeStudent', (gsBuilder) => {
                gsBuilder
                  .where('grade_id', gradeId)
                  .where('academic_year_id', yearId);
              });
          })
          .then((rcqCst) => {
            quarterRcqCsts[quarterId] = rcqCst;
          })
      );
    });

    quarterIds.forEach((quarterId) => {
      promises.push(
        this.fetchNonRankedQuarter(yearId, gradeId, quarterId).then(
          (parsed) => {
            // console.log(parsed);
            (quarterRcqCsts[quarterId] || []).push(...parsed);
          }
        )
      );
    });

    semesterIds.forEach((semesterId) => {
      promises.push(
        Rcs.query()
          .select('id', 'grade_student_id', 'average')
          .where('semester_id', semesterId)
          .preload('gradeStudent', (gsBuilder) => {
            gsBuilder
              .select('id', 'student_id')
              .preload('student', (studentBuilder) => {
                studentBuilder.select(
                  'id',
                  'first_name',
                  'father_name',
                  'grand_father_name',
                  'gender'
                );
              });
          })
          .whereHas('gradeStudent', (gsBuilder) => {
            gsBuilder
              .where('grade_id', gradeId)
              .where('academic_year_id', yearId);
          })
          .then((rcs) => {
            semesterReports[semesterId] = rcs;
          })
      );
    });

    semesterIds.forEach((semesterId) => {
      RcsCst.query()
        .select('id', 'cst_id', 'rcs_id', 'score')
        .preload('cst', (cstBuilder) => {
          cstBuilder.select('subject_id');
        })
        .preload('rcs', (rcsBuilder) => {
          rcsBuilder
            .select('id', 'grade_student_id', 'average')
            .preload('gradeStudent', (gsBuilder) => {
              gsBuilder
                .select('id', 'student_id')
                .preload('student', (studentBuilder) => {
                  studentBuilder.select(
                    'id',
                    'first_name',
                    'father_name',
                    'grand_father_name',
                    'gender'
                  );
                });
            });
        })
        .whereHas('rcs', (rcsBuilder) => {
          rcsBuilder
            .where('semester_id', semesterId)
            .whereHas('gradeStudent', (gsBuilder) => {
              gsBuilder
                .where('grade_id', gradeId)
                .where('academic_year_id', yearId);
            });
        })
        .then((rcyCst) => {
          semesterRcsCsts[semesterId] = rcyCst;
        });
    });

    semesterIds.forEach((semesterId) => {
      promises.push(
        this.fetchNonRankedSemester(yearId, gradeId, semesterId).then(
          (parsed) => {
            (semesterRcsCsts[semesterId] || []).push(...parsed);
          }
        )
      );
    });

    promises.push(
      Rcy.query()
        .select('id', 'grade_student_id', 'average')
        .where('academic_year_id', yearId)
        .preload('gradeStudent', (gsBuilder) => {
          gsBuilder
            .select('id', 'student_id')
            .preload('student', (studentBuilder) => {
              studentBuilder.select(
                'id',
                'first_name',
                'father_name',
                'grand_father_name',
                'gender'
              );
            });
        })
        .whereHas('gradeStudent', (gsBuilder) => {
          gsBuilder
            .where('grade_id', gradeId)
            .where('academic_year_id', yearId);
        })
        .then((rcy) => {
          yearReports = rcy;
        })
    );

    promises.push(
      RcyCst.query()
        .select('id', 'cst_id', 'rcy_id', 'score')
        .preload('cst', (cstBuilder) => {
          cstBuilder.select('subject_id');
        })
        .preload('rcy', (rcyBuilder) => {
          rcyBuilder
            .select('id', 'grade_student_id', 'average')
            .preload('gradeStudent', (gsBuilder) => {
              gsBuilder
                .select('id', 'student_id')
                .preload('student', (studentBuilder) => {
                  studentBuilder.select(
                    'id',
                    'first_name',
                    'father_name',
                    'grand_father_name',
                    'gender'
                  );
                });
            });
        })
        .whereHas('rcy', (rcyBuilder) => {
          rcyBuilder
            .where('academic_year_id', yearId)
            .whereHas('gradeStudent', (gsBuilder) => {
              gsBuilder
                .where('grade_id', gradeId)
                .where('academic_year_id', yearId);
            });
        })
        .then((rcyCst) => {
          yearRcyCsts = rcyCst;
        })
    );

    promises.push(
      this.fetchNonRankedYear(yearId, gradeId).then((parsed) => {
        (yearRcyCsts || []).push(...parsed);
      })
    );

    await Promise.all(promises);

    // const nonRanked = await this.fetchNonRankedQuarter(
    //   '76c05aa8-161a-40eb-9539-be5bc0c2b70b',
    //   '97dc7fcd-652f-4ca0-9dc2-1481c479a887',
    //   '7ba26452-fcf6-46ad-b298-5c2afb98a999'
    // );

    return {
      // nonRanked: nonRanked.slice(3, 4),
      semesterRcsCsts,
      semesterReports,
      quarterRcqCsts,
      quarterReports,
      yearRcyCsts,
      yearReports,
    };
  }

  async fetchReport(gradeId: string) {
    const quarterIds = (await Quarter.query()).map((i) => i.id);
    const semesterIds = (await Semester.query()).map((i) => i.id);
    const year = await AcademicYearService.getActive();

    const report = await this.fetchGradeReport(
      {
        semesterIds,
        quarterIds,
        yearId: year.id,
      },
      gradeId
    );

    return report;
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

    const totalMark = marks / factor;

    console.log(totalMark);

    return totalMark;
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

          const studentKey = student.id;
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
      const studentKey = student.id;
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

          const studentKey = student.id;
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
      const studentKey = student.id;
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

          const studentKey = student.id;
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
      const studentKey = student.id;
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
        student: { id, first_name, father_name, grand_father_name },
      } = gs;
      studentIdMap[id] = `${first_name} ${father_name || ''} ${
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

  parseQuarterMarkList(students: Student[], csts: Cst[], _rcqs: Rcq[]) {
    const cstMap: Record<string, any> = {};
    const activeGsIds = students.map((student) => student.gradeStudents[0].id);

    csts.forEach((cst) => {
      cst.evaluationMethods.forEach((method) => {
        method.smls.forEach((sml) => {
          if (activeGsIds.includes(sml.grade_student_id)) {
            if (cstMap[sml.grade_student_id] === undefined) {
              cstMap[sml.grade_student_id] = {};
            }
            if (cstMap[sml.grade_student_id][cst.id] === undefined) {
              cstMap[sml.grade_student_id][cst.id] = {};
            }

            cstMap[sml.grade_student_id][cst.id][method.quarter_id] =
              (cstMap[sml.grade_student_id][cst.id][method.quarter_id] || 0) +
              sml.score;
          }
        });
      });
    });

    return cstMap;
  }

  calculateMark(
    parsedCst: Record<string, Record<string, Record<string, number>>>
  ) {
    const gsIds = Object.keys(parsedCst);
    const markMap: Record<string, Record<string, number>> = {};

    gsIds.forEach((gsId) => {
      const cstIds = Object.keys(parsedCst[gsId]);
      markMap[gsId] = {};

      cstIds.forEach((cstId) => {
        const cstMarks = parsedCst[gsId][cstId];
        const markCount = Object.keys(cstMarks).length;

        // console.log(cstMarks, markCount);

        if (markCount) {
          const filteredMarks = Object.values(cstMarks).map((i) =>
            i > 100 ? 100 : i
          );

          markMap[gsId][cstId] =
            filteredMarks.reduce((a, b) => a + b) / markCount;
        }
      });
    });

    return markMap;
  }

  async fetchRcss(semesterIds: string[], gradeStudentIds: string[]) {
    const rcsMap: any = {};
    for (let i = 0; i < semesterIds.length; i++) {
      const rcss = await Rcs.query()
        .whereHas('gradeStudent', (gsBuilder) => {
          gsBuilder.whereIn('id', gradeStudentIds);
        })
        .where('semester_id', semesterIds[i]);

      rcss.forEach((rcs) => {
        if (rcsMap[rcs.grade_student_id] === undefined) {
          rcsMap[rcs.grade_student_id] = {};
        }

        rcsMap[rcs.grade_student_id][semesterIds[i]] = rcs;
      });
    }

    return rcsMap;
  }

  async fetchRcqs(quarterIds: string[], gradeStudentIds: string[]) {
    const rcqMap: any = {};
    for (let i = 0; i < quarterIds.length; i++) {
      const rcqs = await Rcq.query()
        .whereHas('gradeStudent', (gsBuilder) => {
          gsBuilder.whereIn('id', gradeStudentIds);
        })
        .where('quarter_id', quarterIds[i]);

      rcqs.forEach((rcq) => {
        if (rcqMap[rcq.grade_student_id] === undefined) {
          rcqMap[rcq.grade_student_id] = {};
        }

        rcqMap[rcq.grade_student_id][quarterIds[i]] = rcq;
      });
    }

    return rcqMap;
  }
}
