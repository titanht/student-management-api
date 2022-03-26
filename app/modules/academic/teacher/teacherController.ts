import ApiController from 'app/modules/_shared/apiController';
import Teacher from './teacher';
import TeacherService from './teacherService';
import CTeacherVal from './cTeacherVal';
import ETeacherVal from './eTeacherVal';

export default class TeacherController extends ApiController<Teacher> {
  constructor(protected service = new TeacherService()) {
    super(service, {
      createValidator: CTeacherVal,
      editValidator: ETeacherVal,
    });
  }
}
