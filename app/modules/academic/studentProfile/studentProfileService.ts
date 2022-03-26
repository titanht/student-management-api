import Service from 'app/modules/_shared/service';
import StudentProfile from './studentProfile';
import StudentProfileRepo from './studentProfileRepo';

export default class StudentProfileService extends Service<StudentProfile> {
  constructor() {
    super(new StudentProfileRepo());
  }
}
