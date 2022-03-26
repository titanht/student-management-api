import { FactoryBuilderQueryContract } from '@ioc:Adonis/Lucid/Factory';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';
import Grade from 'app/modules/academic/grade/grade';
import GradeStudent from 'app/modules/academic/gradeStudent/gradeStudent';
import Cst from 'app/modules/academic/marklist/cst/cst';
import EvaluationMethod from 'app/modules/academic/marklist/evaluationMethod/evaluationMethod';
import EvaluationType from 'app/modules/academic/marklist/evaluationType/evaluationType';
import Quarter from 'app/modules/academic/marklist/quarter/quarter';
import Semester from 'app/modules/academic/marklist/semester/semester';
import Sml from 'app/modules/academic/marklist/sml/sml';
import Subject from 'app/modules/academic/marklist/subject/subject';
import Student from 'app/modules/academic/student/student';
import { AcademicYearFactory } from '../academicYear/academicFactory';
import { GradeFactory } from '../grade/gradeFactory';
import { GradeStudentFactory } from '../gradeStudent/gradeStudentFactory';
import { CstFactory } from '../marklist/cst/cstFactory';
import { EvaluationMethodFactory } from '../marklist/evaluationMethod/evaluationMethodFactory';
import { EvaluationTypeFactory } from '../marklist/evaluationType/evaluationTypeFactory';
import { QuarterFactory } from '../marklist/quarter/quarterFactory';
import { SemesterFactory } from '../marklist/semester/semesterFactory';
import { SmlFactory } from '../marklist/sml/smlFactory';
import { SubjectFactory } from '../marklist/subject/subjectFactory';
import { StudentFactory } from '../student/studentFactory';

export type Fac<T> = Record<string, Partial<T>>;

const o = Object;

const yearData: Fac<AcademicYear> = {
  ay1: {
    id: 'ay1',
    year: 2011,
    active: true,
  },
  ay2: {
    id: 'ay2',
    year: 2021,
    active: false,
  },
};

const gradeData: Fac<Grade> = {
  g1: {
    id: 'g1',
    name: 'Grade 1',
  },
};

const studentData: Fac<Student> = {
  st1: {
    id: 'st1',
    first_name: 'Eren',
    father_name: 'Yaeger',
  },
  st2: {
    id: 'st2',
    first_name: 'Eren',
    father_name: 'Yaeger',
  },
};

const gsData: Fac<GradeStudent> = {
  gs1: {
    id: 'gs1',
    grade_id: 'g1',
    student_id: 'st1',
    academic_year_id: 'ay1',
  },
  gs2: {
    id: 'gs2',
    grade_id: 'g1',
    student_id: 'st2',
    academic_year_id: 'ay1',
  },
};

const subjectData: Fac<Subject> = {
  su1: {
    id: 'su1',
    subject: 'English',
    consider_for_rank: true,
  },
  su2: {
    id: 'su2',
    subject: 'Math',
    consider_for_rank: true,
  },
  su3: {
    id: 'su3',
    subject: 'Sport',
    consider_for_rank: false,
  },
  su4: {
    id: 'su4',
    subject: 'Amharic',
    consider_for_rank: true,
  },
};

const cstData: Fac<Cst> = {
  cst1: {
    id: 'cst1',
    grade_id: 'g1',
    subject_id: 'su1',
    teacher_id: 't1',
    academic_year_id: 'ay1',
  },
  cst2: {
    id: 'cst2',
    grade_id: 'g1',
    subject_id: 'su2',
    teacher_id: 't2',
    academic_year_id: 'ay1',
  },
  cst3: {
    id: 'cst3',
    grade_id: 'g1',
    subject_id: 'su2',
    teacher_id: 't3',
    academic_year_id: 'ay2',
  },
  cst4: {
    id: 'cst4',
    grade_id: 'g2',
    subject_id: 'su2',
    teacher_id: 't2',
    academic_year_id: 'ay1',
  },
  cst5: {
    id: 'cst5',
    grade_id: 'g1',
    subject_id: 'su3',
    teacher_id: 't2',
    academic_year_id: 'ay1',
  },
  cst6: {
    id: 'cst6',
    grade_id: 'g1',
    subject_id: 'su4',
    teacher_id: 't2',
    academic_year_id: 'ay1',
  },
};

const semesterData: Fac<Semester> = {
  sem1: {
    id: 'sem1',
    semester: 1,
  },
  sem2: {
    id: 'sem2',
    semester: 2,
  },
  sem3: {
    id: 'sem3',
    semester: 3,
  },
};

const quarterData: Fac<Quarter> = {
  q1: {
    id: 'q1',
    quarter: 1,
    semester_id: 'sem1',
  },
  q2: {
    id: 'q2',
    quarter: 2,
    semester_id: 'sem1',
  },
  q3: {
    id: 'q3',
    quarter: 3,
    semester_id: 'sem2',
  },
  q4: {
    id: 'q4',
    quarter: 4,
    semester_id: 'sem3',
  },
};

const evalTypeData: Fac<EvaluationType> = {
  et1: {
    id: 'et1',
    name: 'Mid',
    weight: 40,
  },
  et2: {
    id: 'et2',
    name: 'Final',
    weight: 60,
  },
  et3: {
    id: 'et3',
    name: 'Full',
    weight: 100,
  },
};

const evalMethodData: Fac<EvaluationMethod> = {
  em1: {
    id: 'em1',
    evaluation_type_id: 'et1',
    quarter_id: 'q1',
    cst_id: 'cst1',
  },
  em2: {
    id: 'em2',
    evaluation_type_id: 'et2',
    quarter_id: 'q1',
    cst_id: 'cst1',
  },
  em3: {
    id: 'em3',
    evaluation_type_id: 'et1',
    quarter_id: 'q1',
    cst_id: 'cst2',
  },
  em4: {
    id: 'em4',
    evaluation_type_id: 'et2',
    quarter_id: 'q1',
    cst_id: 'cst2',
  },
  em5: {
    id: 'em5',
    evaluation_type_id: 'et3',
    quarter_id: 'q2',
    cst_id: 'cst1',
  },
  em6: {
    id: 'em6',
    evaluation_type_id: 'et3',
    quarter_id: 'q2',
    cst_id: 'cst2',
  },
  em7: {
    id: 'em7',
    evaluation_type_id: 'et3',
    quarter_id: 'q3',
    cst_id: 'cst1',
  },
  em8: {
    id: 'em8',
    evaluation_type_id: 'et3',
    quarter_id: 'q3',
    cst_id: 'cst3',
  },
  em9: {
    id: 'em9',
    evaluation_type_id: 'et3',
    quarter_id: 'q4',
    cst_id: 'cst6',
  },
};

const smlData: Fac<Sml> = {
  sml1: {
    id: 'sml1',
    evaluation_method_id: 'em1',
    grade_student_id: 'gs1',
    score: 37,
  },
  sml2: {
    id: 'sml2',
    evaluation_method_id: 'em2',
    grade_student_id: 'gs2',
    score: 58,
  },
  sml3: {
    id: 'sml3',
    evaluation_method_id: 'em3',
    grade_student_id: 'gs1',
    score: 35,
  },
  sml4: {
    id: 'sml4',
    evaluation_method_id: 'em4',
    grade_student_id: 'gs1',
    score: 55,
  },
  sml5: {
    id: 'sml5',
    evaluation_method_id: 'em1',
    grade_student_id: 'gs2',
    score: 50,
  },
  sml6: {
    id: 'sml6',
    evaluation_method_id: 'em5',
    grade_student_id: 'gs1',
    score: 90,
  },
  sml7: {
    id: 'sml7',
    evaluation_method_id: 'em5',
    grade_student_id: 'gs2',
    score: 90,
  },
  sml8: {
    id: 'sml8',
    evaluation_method_id: 'em6',
    grade_student_id: 'gs1',
    score: 95,
  },
};

const generateModel = async (
  data: object,
  factory: FactoryBuilderQueryContract<any>
) => {
  const ps: Promise<any>[] = [];
  o.keys(data).forEach((key) => ps.push(factory.merge(data[key]).create()));
  await Promise.all(ps);
};

type GenerateMarkArgs = {
  markYearActive?: boolean;
};

export const generateMarkData = async (markArgs?: GenerateMarkArgs) => {
  await generateModel(
    { ...yearData, active: !!markArgs?.markYearActive },
    AcademicYearFactory
  );
  await generateModel(gradeData, GradeFactory);
  await generateModel(studentData, StudentFactory);
  await generateModel(gsData, GradeStudentFactory);
  await generateModel(subjectData, SubjectFactory);
  await generateModel(cstData, CstFactory);

  await generateModel(semesterData, SemesterFactory);
  await generateModel(quarterData, QuarterFactory);

  await generateModel(evalTypeData, EvaluationTypeFactory);
  await generateModel(evalMethodData, EvaluationMethodFactory);
  await generateModel(smlData, SmlFactory);
};
