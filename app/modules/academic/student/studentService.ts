import Service from 'app/modules/_shared/service';
import Student from './student';
import StudentRepo from './studentRepo';

export default class StudentService extends Service<Student> {
  constructor() {
    super(new StudentRepo());
  }
}
