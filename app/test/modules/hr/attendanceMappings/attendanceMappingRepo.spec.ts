import test from 'japa';
import AttendanceMappingRepo from 'app/modules/hr/attendanceMappings/attendanceMappingRepo';
import { transact } from 'app/test/testUtils';
import { AttendanceMappingFactory } from './attendanceMappingFactory';
import { expect } from 'chai';

const mappingRepo = new AttendanceMappingRepo();

transact('attendanceMappingRepo', () => {
  test('getAccountIdMapping returns mapping', async () => {
    const att = await AttendanceMappingFactory.create();

    const mapping = await mappingRepo.getAccountIdMapping();

    expect(mapping).to.deep.equal({
      [att.account_id]: att.user_id,
    });
  });
});
