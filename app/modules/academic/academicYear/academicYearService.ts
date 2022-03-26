import Service from 'app/modules/_shared/service';
import AcademicYear from './academicYear';
import AcademicYearRepo from './academicYearRepo';

export default class AcademicYearService extends Service<AcademicYear> {
  constructor() {
    super(new AcademicYearRepo());
  }

  async create(createData: Partial<AcademicYear>) {
    return super.create({ ...createData, active: false });
  }

  static async getActive() {
    return AcademicYear.getActiveYear();
  }

  async setActive(id: string) {
    return (this.repo as AcademicYearRepo).setActive(id);
  }
}
