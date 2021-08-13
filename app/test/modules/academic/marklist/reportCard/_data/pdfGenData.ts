import Cst from 'app/modules/academic/marklist/cst/cst';
import Rcq from 'app/modules/academic/marklist/reportCard/rcq/rcq';
import RcqCst from 'app/modules/academic/marklist/reportCard/rcqCst/rcqCst';
import Subject from 'app/modules/academic/marklist/subject/subject';
import { getOne } from 'app/services/utils';
import { GradeFactory } from '../../../grade/gradeFactory';
import { GradeStudentFactory } from '../../../gradeStudent/gradeStudentFactory';
import { CstFactory } from '../../cst/cstFactory';
import { QuarterFactory } from '../../quarter/quarterFactory';
import { SubjectFactory } from '../../subject/subjectFactory';
import { RcqFactory } from '../rcq/rcqFactory';
import { RcqCstFactory } from '../rcqCst/rcqCstFactory';

const seedQuarters = async () => {
  await QuarterFactory.merge({ id: 'q1' }).create();
  await QuarterFactory.merge({ id: 'q2' }).create();
};

const seedGrade = async () => {
  await GradeFactory.merge({ id: 'g1' }).create();
};

const seedGs = async () => {
  await GradeStudentFactory.merge({ id: 'gs1', grade_id: 'g1' }).create();
  await GradeStudentFactory.merge({ id: 'gs2', grade_id: 'g1' }).create();
};

const seedSubjects = async () => {
  await SubjectFactory.merge({ id: 'sub1', subject: 'Amharic' }).create();
  await SubjectFactory.merge({ id: 'sub2', subject: 'English' }).create();
};

const seedCst = async () => {
  await CstFactory.merge({
    id: 'cst1',
    subject_id: 'sub1',
    grade_id: 'g1',
  }).create();
  await CstFactory.merge({
    id: 'cst2',
    subject_id: 'sub2',
    grade_id: 'g1',
  }).create();
};

const seedRcq = async () => {
  // Student 1 report cards
  await RcqFactory.merge({
    id: 'rcq_gs1_1',
    grade_student_id: 'gs1',
    quarter_id: 'q1',
  }).create();
  await RcqFactory.merge({
    id: 'rcq_gs1_2',
    grade_student_id: 'gs1',
    quarter_id: 'q2',
  }).create();

  // Student 2 report cards
  await RcqFactory.merge({
    id: 'rcq_gs2_1',
    grade_student_id: 'gs2',
    quarter_id: 'q1',
  }).create();
  await RcqFactory.merge({
    id: 'rcq_gs2_2',
    grade_student_id: 'gs2',
    quarter_id: 'q2',
  }).create();
};

const seedRcqCst = async () => {
  // Student 1
  // Report 1
  await RcqCstFactory.merge({
    id: 'rcq_gs1_1_cst1',
    rcq_id: 'rcq_gs1_1',
    cst_id: 'cst1',
    score: 10,
  }).create();
  await RcqCstFactory.merge({
    id: 'rcq_gs1_1_cst2',
    rcq_id: 'rcq_gs1_1',
    cst_id: 'cst2',
    score: 20,
  }).create();
  // Report 2
  await RcqCstFactory.merge({
    id: 'rcq_gs1_2_cst1',
    rcq_id: 'rcq_gs1_2',
    cst_id: 'cst1',
    score: 30,
  }).create();
  await RcqCstFactory.merge({
    id: 'rcq_gs1_2_cst2',
    rcq_id: 'rcq_gs1_2',
    cst_id: 'cst2',
    score: 40,
  }).create();

  // Student 2
  // Report 1
  await RcqCstFactory.merge({
    id: 'rcq_gs2_1_cst1',
    rcq_id: 'rcq_gs2_1',
    cst_id: 'cst1',
  }).create();
  await RcqCstFactory.merge({
    id: 'rcq_gs2_1_cst2',
    rcq_id: 'rcq_gs2_1',
    cst_id: 'cst2',
  }).create();
  // Report 2
  await RcqCstFactory.merge({
    id: 'rcq_gs2_2_cst1',
    rcq_id: 'rcq_gs2_2',
    cst_id: 'cst1',
  }).create();
  await RcqCstFactory.merge({
    id: 'rcq_gs2_2_cst2',
    rcq_id: 'rcq_gs2_2',
    cst_id: 'cst2',
  }).create();
};

export const genPdf = async () => {
  await seedQuarters();
  await seedGrade();
  await seedGs();

  await seedSubjects();
  await seedCst();

  await seedRcq();
  await seedRcqCst();
};

export const studentAssertData = async () => {
  return [
    {
      ...(await getOne(RcqCst, 'rcq_gs1_1_cst1')),
      rcq: await getOne(Rcq, 'rcq_gs1_1'),
      cst: {
        ...(await getOne(Cst, 'cst1')),
        subject: await getOne(Subject, 'sub1'),
      },
    },
    {
      ...(await getOne(RcqCst, 'rcq_gs1_1_cst2')),
      rcq: await getOne(Rcq, 'rcq_gs1_1'),
      cst: {
        ...(await getOne(Cst, 'cst2')),
        subject: await getOne(Subject, 'sub2'),
      },
    },
    {
      ...(await getOne(RcqCst, 'rcq_gs1_2_cst1')),
      rcq: await getOne(Rcq, 'rcq_gs1_2'),
      cst: {
        ...(await getOne(Cst, 'cst1')),
        subject: await getOne(Subject, 'sub1'),
      },
    },
    {
      ...(await getOne(RcqCst, 'rcq_gs1_2_cst2')),
      rcq: await getOne(Rcq, 'rcq_gs1_2'),
      cst: {
        ...(await getOne(Cst, 'cst2')),
        subject: await getOne(Subject, 'sub2'),
      },
    },
  ];
};

export const formattedAssertData = {
  Amharic: {
    q1: 10,
    q2: 30,
  },
  English: {
    q1: 20,
    q2: 40,
  },
};
