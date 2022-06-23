import Service from 'app/modules/_shared/service';
import { massSerialize } from 'app/services/utils';
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

  async getSubjectsByReport(template: string) {
    return massSerialize(
      await Subject.query()
        .where('report_card_template', template)
        .where('show_on_report', true)
        .orderBy('order', 'asc')
    ).map((i) => ({
      subject: i.subject,
      display_mode: i.display_mode,
      display_rules: i.display_rules,
    }));
  }
}
