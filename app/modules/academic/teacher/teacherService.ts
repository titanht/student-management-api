import Service from 'app/modules/_shared/service';
import Teacher from './teacher';
import TeacherRepo from './teacherRepo';

export default class TeacherService extends Service<Teacher> {
  constructor() {
    super(new TeacherRepo());
  }
}
