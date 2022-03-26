import { Repo } from 'app/modules/_shared/repo';
import AttendanceMapping from './attendanceMapping';

export default class AttendanceMappingRepo extends Repo<AttendanceMapping> {
  constructor() {
    super(AttendanceMapping);
  }

  async getAccountIdMapping(): Promise<Record<string, string>> {
    const mapping: Record<string, string> = {};
    const attMappings = await this.findAll();
    attMappings.forEach((item) => {
      mapping[item.account_id] = item.user_id;
    });

    return mapping;
  }
}
