import AcademicYearRepo from 'app/modules/academic/academicYear/academicYearRepo';
import test from 'japa';
import { transact } from 'app/test/testUtils';
import { AcademicYearFactory } from './academicFactory';
import { expect } from 'chai';
import AcademicYear from 'app/modules/academic/academicYear/academicYear';

const academicYearRepo = new AcademicYearRepo();
const factory = AcademicYearFactory;

transact('AcademicYearRepo', () => {
  test('change active and reset others', async () => {
    await factory.merge({ year: 2010, active: true }).create();
    const yr = await factory.merge({ year: 2011, active: false }).create();

    await academicYearRepo.setActive(yr.id);

    const activeYears = await AcademicYear.query().where('active', true);
    expect(activeYears.length).to.equal(1);

    const activeYear = await AcademicYear.query()
      .where('active', true)
      .firstOrFail();
    expect(activeYear.id).to.equal(yr.id);
  });
});
