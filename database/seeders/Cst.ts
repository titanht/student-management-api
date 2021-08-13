// import fs from 'fs';
// import path from 'path';
// import Database from '@ioc:Adonis/Lucid/Database';
// import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
// import { AcademicYearFactory } from 'app/test/modules/academic/academicYear/academicFactory';
// import { GradeFactory } from 'app/test/modules/academic/grade/gradeFactory';
// import { SubjectFactory } from 'app/test/modules/academic/marklist/subject/subjectFactory';
// import { EvaluationTypeFactory } from 'app/test/modules/academic/marklist/evaluationType/evaluationTypeFactory';
// import Student from 'app/modules/academic/student/student';
// import { TeacherFactory } from 'app/test/modules/academic/teacher/teacherFactory';
// import { CstFactory } from 'app/test/modules/academic/marklist/cst/cstFactory';
// import { EvaluationMethodFactory } from 'app/test/modules/academic/marklist/evaluationMethod/evaluationMethodFactory';
// import { QuarterFactory } from 'app/test/modules/academic/marklist/quarter/quarterFactory';
// import { SemesterFactory } from 'app/test/modules/academic/marklist/semester/semesterFactory';
// import { Gender } from 'app/modules/_shared/types';
// import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
// import Sml from 'app/modules/academic/marklist/sml/sml';

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';

// export default class CstSeeder extends BaseSeeder {
//   public async run() {
//     console.log('seed');
//     try {
//       await Database.beginGlobalTransaction();

//       const ay = await AcademicYearFactory.merge({
//         year: 2013,
//         active: true,
//       }).create();
//       const sem = await SemesterFactory.merge({ semester: 1 }).create();
//       const q = await QuarterFactory.merge({
//         quarter: 1,
//         semester_id: sem.id,
//       }).create();
//       const grade = await GradeFactory.merge({ name: 'Grade 1' }).create();
//       const et = await EvaluationTypeFactory.merge({
//         name: 'final',
//         weight: 100,
//       }).create();
//       const teach = await TeacherFactory.with('user').create();

//       const cstCsv = fs
//         .readFileSync(path.join(__dirname, 'cst.csv'))
//         .toString()
//         .split('\n')
//         .filter((i) => i !== '');

//       const subs = cstCsv[0].split(',').slice(2, 14);
//       console.log(subs);
//       const emMap = {};
//       let promises: Promise<any>[] = [];
//       subs.forEach((sub) => {
//         promises.push(
//           new Promise(async (resolve, _rej) => {
//             const subNew = await SubjectFactory.merge({
//               subject: sub,
//               consider_for_rank: true,
//             }).create();
//             const cst = await CstFactory.merge({
//               subject_id: subNew.id,
//               grade_id: grade.id,
//               teacher_id: teach.id,
//               academic_year_id: ay.id,
//             }).create();
//             const em = await EvaluationMethodFactory.merge({
//               cst_id: cst.id,
//               quarter_id: q.id,
//               evaluation_type_id: et.id,
//             }).create();
//             emMap[sub] = em.id;

//             resolve(null);
//           })
//         );
//       });
//       await Promise.all(promises);
//       promises = [];

//       // console.log(cstCsv.slice(1));
//       const cstPromises: Promise<any>[] = [];

//       cstCsv.slice(1).forEach((csv) => {
//         const dataSplit = csv.split(',');
//         const [first, mid, last] = dataSplit[1].split(' ');
//         const marks = dataSplit.slice(2, 14).map((i) => parseInt(i, 10));
//         // console.log(marks);
//         cstPromises.push(
//           new Promise(async (resolve, _rej) => {
//             // await new Promise((r) => setTimeout(r, 100));
//             const student = await Student.create({
//               first_name: first,
//               father_name: mid,
//               grand_father_name: last || '',
//               gender: Gender.Male,
//             });
//             const gs = await GradeStudent.create({
//               grade_id: grade.id,
//               student_id: student.id,
//               academic_year_id: ay.id,
//             });

//             const markPromises: Promise<any>[] = [];
//             marks.forEach((mark, i) => {
//               markPromises.push(
//                 Sml.create({
//                   evaluation_method_id: emMap[subs[i]],
//                   grade_student_id: gs.id,
//                   score: mark,
//                   finalized: true,
//                 })
//               );
//             });
//             await Promise.all(markPromises);

//             resolve(null);
//           })
//         );
//       });

//       // console.log(cstPromises);

//       await Promise.all(cstPromises);

//       await Database.commitGlobalTransaction();
//     } catch (err) {
//       console.log('errr', err);
//     }
//   }
// }

export default class CstSeeder extends BaseSeeder {
  public async run() {
    //
  }
}
