import Service from 'app/modules/_shared/service';
import Subject from './subject';
import SubjectRepo from './subjectRepo';

export default class SubjectService extends Service<Subject> {
  constructor() {
    super(new SubjectRepo());
  }

  async fetchSubjects() {
    const subjects = (await (this.repo as SubjectRepo).findAll()) as Subject[];

    return subjects.map((sub) => sub.subject);
  }
}
