import { Repo } from 'app/modules/_shared/repo';
import Teacher from './teacher';

export default class TeacherRepo extends Repo<Teacher> {
  constructor() {
    super(Teacher);
  }

  async findAll() {
    return Teacher.query().preload('user');
  }
}
