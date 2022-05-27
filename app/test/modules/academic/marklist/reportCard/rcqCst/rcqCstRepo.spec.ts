// import RcqCst from 'app/modules/academic/marklist/reportCard/rcqCst/rcqCst';
// import RcqCstRepo from 'app/modules/academic/marklist/reportCard/rcqCst/rcqCstRepo';
// import { getCount } from 'app/services/utils';
// import { expectExceptTimestamp, transact } from 'app/test/testUtils';
// import { expect } from 'chai';
// import test from 'japa';
// // import { genPdf, studentAssertData } from '../_data/pdfGenData';

// const rcqCstRepo = new RcqCstRepo();

// transact('createOrUpdate', () => {
//   // test('fetchStudentMarks', async () => {
//   //   await genPdf();
//   //   const studentData = await rcqCstRepo.fetchStudentMarks('gs1');
//   //   expect(studentData).to.deep.equal(await studentAssertData());
//   // });

//   test('creates and updates', async () => {
//     await rcqCstRepo.createOrUpdate([{ id: 'cst1', score: 20 }], 'rc1');
//     expect(await getCount(RcqCst)).to.equal(1);
//     let cst1 = (
//       await RcqCst.query().where('cst_id', 'cst1').firstOrFail()
//     ).serialize();
//     delete cst1.id;
//     expectExceptTimestamp(cst1, { cst_id: 'cst1', rcq_id: 'rc1', score: 20 });

//     // updates
//     await rcqCstRepo.createOrUpdate(
//       [
//         { id: 'cst1', score: 30 },
//         { id: 'cst2', score: 90 },
//       ],
//       'rc1'
//     );
//     // console.log((await RcqCst.all()).map((i) => i.serialize()));
//     expect(await getCount(RcqCst)).to.equal(2);
//     cst1 = (
//       await RcqCst.query().where('cst_id', 'cst1').firstOrFail()
//     ).serialize();
//     delete cst1.id;
//     expectExceptTimestamp(cst1, { cst_id: 'cst1', rcq_id: 'rc1', score: 30 });

//     const cst2 = (
//       await RcqCst.query().where('cst_id', 'cst2').firstOrFail()
//     ).serialize();
//     delete cst2.id;
//     expectExceptTimestamp(cst2, { cst_id: 'cst2', rcq_id: 'rc1', score: 90 });
//   });
// });
