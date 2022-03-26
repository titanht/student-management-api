import { Repo } from 'app/modules/_shared/repo';
import Student from './student';

export default class StudentRepo extends Repo<Student> {
  constructor() {
    super(Student);
  }
}
