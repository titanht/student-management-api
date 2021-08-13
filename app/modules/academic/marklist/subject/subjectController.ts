import ApiController from 'app/modules/_shared/apiController';
import Subject from './subject';
import SubjectService from './subjectService';
import CSubjectVal from './cSubjectVal';
import ESubjectVal from './eSubjectVal';

export default class SubjectController extends ApiController<Subject> {
  constructor(protected service = new SubjectService()) {
    super(service, {
      createValidator: CSubjectVal,
      editValidator: ESubjectVal,
    });
  }
}
