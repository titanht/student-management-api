import Service from 'app/modules/_shared/service';
import Sml from './sml';
import SmlRepo from './smlRepo';

export default class SmlService extends Service<Sml> {
  constructor() {
    super(new SmlRepo());
  }

  async create(createData: Partial<Sml>) {
    return this.repo.updateOrCreateModel(
      {
        grade_student_id: createData.grade_student_id,
        evaluation_method_id: createData.evaluation_method_id,
      },
      { ...createData, finalized: false }
    );
  }
}
