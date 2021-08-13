import { Repo } from 'app/modules/_shared/repo';
import AcademicYear from '../../academicYear/academicYear';
import Grade from '../../grade/grade';
import Student from '../../student/student';
import Hrt from './hrt';

export default class HrtRepo extends Repo<Hrt> {
  constructor() {
    super(Hrt);
  }

  async fetchGrade(userId: string) {
    const year = await AcademicYear.getActiveYear();
    const hrt = await Hrt.query().where('user_id', userId).firstOrFail();
    const grade = (await Grade.findOrFail(hrt.grade_id)).serialize();
    const students = (
      await Student.query()
        .whereHas('gradeStudents', (builder) => {
          builder
            .where('academic_year_id', year.id)
            .where('grade_id', grade.id);
        })
        .orderBy('first_name', 'asc')
    ).map((student) => student.serialize());
    grade.students = students;

    return grade;
  }
}
