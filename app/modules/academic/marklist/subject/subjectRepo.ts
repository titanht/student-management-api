import { Repo } from 'app/modules/_shared/repo';
import Subject from './subject';

export default class SubjectRepo extends Repo<Subject> {
  constructor() {
    super(Subject);
  }

  async getSubjectRankMap() {
    const subMap = {};
    const subjects = await Subject.all();
    subjects.forEach((subject) => {
      subMap[subject.subject] = subject.consider_for_rank;
    });

    return subMap;
  }
}
