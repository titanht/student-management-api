import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { transactify } from 'app/services/utils';
import Grade from 'app/modules/academic/grade/grade';
import Subject from 'app/modules/academic/marklist/subject/subject';
import User from 'app/modules/auth/user';
import Teacher from 'app/modules/academic/teacher/teacher';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import Student from 'app/modules/academic/student/student';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import Cst from 'app/modules/academic/marklist/cst/cst';
import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
import Semester from 'app/modules/academic/marklist/semester/semester';
import Quarter from 'app/modules/academic/marklist/quarter/quarter';
import EvaluationType from 'app/modules/academic/marklist/evaluationType/evaluationType';
import Sml from 'app/modules/academic/marklist/sml/sml';

const logIt = (msg: string) => console.log(msg);

export default class MarkListSeeder extends BaseSeeder {
  public async run() {
    await transactify(async () => {
      const yearId = await seedYear();
      const gradeIdMap = await seedClass();
      const subIdMap = await seedSubject();
      // console.log(subIdMap);
      const teacherIdMap = await seedTeachers();
      const { gsIdMap } = await seedStudentClass(gradeIdMap, yearId);

      await seedQuarterMarks({
        gradeIdMap,
        subIdMap,
        teacherIdMap,
        yearId,
        gsIdMap,
      });
      console.log('Fin');
    });
  }
}

const readFile = (filePath: string) => {
  return fs
    .readFileSync(filePath)
    .toString()
    .replace(/\r/g, '')
    .split('\n')
    .filter((i) => i !== '')
    .slice(1);
};

const mapSubjects = (subjects: string[], scores: string[]) => {
  const newMap: Record<string, string> = {};
  scores.forEach((score, i) => (newMap[subjects[i]] = score));

  return newMap;
};

const filterSubjectMap = (subjectMap: object) => {
  const legitScores: string[] = Object.keys(subjectMap).filter(
    (subject) => subjectMap[subject] !== '' && subjectMap[subject] !== '-'
  );

  return _.pick(subjectMap, legitScores);
};

const seedQuarterMarks = async ({
  gradeIdMap,
  subIdMap,
  teacherIdMap,
  yearId,
  gsIdMap,
}) => {
  const evalTypeId = (
    await EvaluationType.create({
      name: 'Final',
      weight: 100,
    })
  ).id;
  const semesterMap = { 1: [1, 2], 2: [3, 4] };

  const cstIdMap = await seedCST(gradeIdMap, subIdMap, teacherIdMap, yearId);

  for (let i = 1; i <= 2; i++) {
    const semesterId = (await Semester.create({ semester: i })).id;

    for (let j = 0; j < semesterMap[i].length; j++) {
      const quarter = semesterMap[i][j];

      if (
        fs.existsSync(path.join(__dirname, 'files', `Quarter${quarter}.csv`))
      ) {
        const quarterId = (
          await Quarter.create({ quarter, semester_id: semesterId })
        ).id;

        const cstIdTemp = { ...cstIdMap };
        await seedEvaluation(cstIdTemp, quarterId, evalTypeId);

        await seedMark(cstIdTemp, gsIdMap, quarter);
      }
    }
  }
};

const seedMark = async (cstIdMap: object, gsIdMap: object, quarter: number) => {
  logIt(`Seed Mark Quarter: ${quarter}`);
  const markData = readFile(
    path.join(__dirname, 'files', `Quarter${quarter}.csv`)
  );
  const subjectHeader = markData[0].split(',').slice(2);
  // console.log(cstIdMap);

  const studentMarks = markData.slice(1);

  for (let i = 0; i < studentMarks.length; i++) {
    const data = studentMarks[i];
    // console.log(`Student ${i}`, data);
    const [gradeId, studentId, ...scores] = data.split(',');
    const mappedSubjects = mapSubjects(subjectHeader, scores);
    const subjectScore = filterSubjectMap(mappedSubjects);

    if (!_.isEmpty(subjectScore)) {
      const miniPromises: Promise<any>[] = [];
      Object.keys(subjectScore).forEach((subject) => {
        // console.log(gradeId, subject, cstIdMap[gradeId][subject]);
        const { evalMethodId } = cstIdMap[gradeId][subject];
        miniPromises.push(
          Sml.create({
            grade_student_id: gsIdMap[studentId],
            evaluation_method_id: evalMethodId,
            score: subjectScore[subject],
            finalized: true,
          }).catch((err) => {
            console.log('SML error', err);
            fs.writeFileSync(
              `${__dirname}/deb.json`,
              JSON.stringify(
                {
                  anItem: cstIdMap[gradeId][subject],
                  gradeId,
                  subject,
                  cstIdMap,
                },
                null,
                2
              )
            );
            // console.log(
            //   JSON.stringify({ cstIdMap, gradeId, subject }, null, 2)
            // );
            process.exit(0);
            throw err;
          })
        );
      });
      await Promise.all(miniPromises);
    }
  }
};

const seedStudentClass = async (gradeIdMap: object, yearId: string) => {
  logIt('Seed Student Class');
  const sexMap = {
    M: 'Male',
    F: 'Female',
  };
  const studentData = readFile(path.join(__dirname, 'files', 'Student.csv'));
  const studentIdMap = {};
  const gsIdMap = {};
  const promises: Promise<any>[] = [];
  studentData.forEach((data) => {
    const [gradeId, _gName, studentId, name, fName, gName, age, sex] =
      data.split(',');

    promises.push(
      Student.create({
        first_name: name,
        father_name: fName,
        grand_father_name: gName,
        gender: sexMap[sex],
        id_number: studentId,
        age: parseInt(age, 10),
      })
        .then((student) => {
          studentIdMap[studentId] = student.id;
          return GradeStudent.create({
            student_id: student.id,
            grade_id: gradeIdMap[gradeId],
            academic_year_id: yearId,
          });
        })
        .then((gsNew) => (gsIdMap[studentId] = gsNew.id))
    );
  });

  await Promise.all(promises);

  return { studentIdMap, gsIdMap };
};

const seedEvaluation = async (
  cstIdMap: object,
  quarterId: string,
  evalTypeId: string
) => {
  logIt('Seed Eval Method');
  const promises: Promise<any>[] = [];
  Object.keys(cstIdMap).forEach((grade) => {
    Object.keys(cstIdMap[grade]).forEach((subject) => {
      promises.push(
        EvaluationMethod.create({
          cst_id: cstIdMap[grade][subject].cstId,
          quarter_id: quarterId,
          evaluation_type_id: evalTypeId,
        }).then((em) => (cstIdMap[grade][subject].evalMethodId = em.id))
      );
    });
  });

  await Promise.all(promises);
};

const seedCST = async (
  gradeIdMap: object,
  subjectIdMap: object,
  teacherIdMap: object,
  yearId: string
) => {
  logIt('Seed CST');
  const cstData = readFile(path.join(__dirname, 'files', 'CST.csv'));
  const cstIdMap = {};
  const promises: Promise<any>[] = [];

  cstData.forEach((data) => {
    const [gradeId, subjectId, teacherId, count] = data.split(',');
    promises.push(
      Cst.create({
        grade_id: gradeIdMap[gradeId],
        subject_id: subjectIdMap[subjectId],
        teacher_id: teacherIdMap[teacherId],
        count: parseInt(count, 10),
        academic_year_id: yearId,
      }).then((newCst) => {
        if (cstIdMap[gradeId] === undefined) {
          cstIdMap[gradeId] = {};
        }
        cstIdMap[gradeId][subjectId] = {
          cstId: newCst.id,
        };
      })
    );
  });

  await Promise.all(promises);

  return cstIdMap;
};

const seedTeachers = async () => {
  logIt('Seed Teacher');
  const teacherData = readFile(path.join(__dirname, 'files', 'Teacher.csv'));
  const teacherIdMap = {};
  const promises: Promise<any>[] = [];

  teacherData.forEach((data) => {
    const [id, fName, lName] = data.split(',');
    promises.push(
      User.create({
        first_name: fName,
        father_name: lName,
        email: `${fName}${lName}@s.com`.toLowerCase(),
        password: 'secret',
      })
        .then((newUser) => {
          return Teacher.create({
            user_id: newUser.id,
          });
        })
        .then((newTeach) => (teacherIdMap[id] = newTeach.id))
    );
  });

  await Promise.all(promises);

  return teacherIdMap;
};

const seedSubject = async () => {
  logIt('Seed Subject');
  const subjectDate = readFile(path.join(__dirname, 'files', 'Subject.csv'));
  const subjectIdMap = {};
  const promises: Promise<any>[] = [];

  subjectDate.forEach((data) => {
    const [subject, id, ranked] = data.split(',');
    promises.push(
      Subject.create({
        subject,
        code: id,
        consider_for_rank: ranked === 'Yes',
      }).then((newSub) => (subjectIdMap[id] = newSub.id))
    );
  });

  await Promise.all(promises);

  return subjectIdMap;
};

const seedClass = async () => {
  logIt('Seed Class');
  const classData = readFile(path.join(__dirname, 'files', 'Class.csv'));
  const gradeIdMap = {};
  const promises: Promise<any>[] = [];

  classData.forEach((data) => {
    const [id, name] = data.split(',');
    promises.push(
      Grade.create({
        name,
        monthly_fee: 500,
        tutorial_fee: 500,
        summer_fee: 500,
        registration_fee: 1000,
      }).then((newG) => (gradeIdMap[id] = newG.id))
    );
  });

  await Promise.all(promises);

  return gradeIdMap;
};

const seedYear = async () => {
  logIt('Seed Year');
  return (
    await AcademicYear.create({
      year: 2013,
      active: true,
    })
  ).id;
};
