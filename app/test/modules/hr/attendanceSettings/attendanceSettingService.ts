import AttendanceSetting from 'app/modules/hr/attendanceSettings/attendanceSetting';
import AttendanceSettingService from 'app/modules/hr/attendanceSettings/attendanceSettingService';
import { getCount } from 'app/services/utils';
import { transact } from 'app/test/testUtils';
import { expect } from 'chai';
import test from 'japa';
import { AttendanceSettingFactory } from './attendanceSettingFactory';

const attService = new AttendanceSettingService();

transact('attendanceService', async () => {
  test('create creates or updates', async () => {
    expect(await getCount(AttendanceSetting)).to.equal(0);

    const att = await AttendanceSettingFactory.make();
    await attService.create(att.serialize());
    expect(await getCount(AttendanceSetting)).to.equal(1);

    const att2 = await AttendanceSettingFactory.make();
    await attService.create(att2.serialize());
    expect(await getCount(AttendanceSetting)).to.equal(1);

    const attDb = await AttendanceSetting.firstOrFail();
    expect(attDb.in_begin).to.equal(att2.in_begin);
  });
});
