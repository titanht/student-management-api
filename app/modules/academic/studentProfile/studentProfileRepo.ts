import { Repo } from 'app/modules/_shared/repo';
import StudentProfile from './studentProfile';

export default class StudentProfileRepo extends Repo<StudentProfile> {
  constructor() {
    super(StudentProfile);
  }
}
