import { Repo } from 'app/modules/_shared/repo';
import AcademicYear from './academicYear';

export default class AcademicYearRepo extends Repo<AcademicYear> {
  constructor() {
    super(AcademicYear);
  }

  async setActive(id: string) {
    await AcademicYear.query().update({ active: false });
    await AcademicYear.query().where('id', id).update({ active: true });
  }
}
