import Grade from 'app/modules/academic/grade/grade';
import Student from 'app/modules/academic/student/student';

type GradeGS = {
  grade: Grade;
};

type StudentGS = {
  gradeStudents: GradeGS[];
};

export type UnpaidStudent = StudentGS & Student;
