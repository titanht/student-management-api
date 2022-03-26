import test from 'japa';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import RcsCst from 'app/modules/academic/marklist/reportCard/rcsCst/rcsCst';
import { getCount } from 'app/services/utils';
import RcsCstRepo from 'app/modules/academic/marklist/reportCard/rcsCst/rcsCstRepo';
import { expect } from 'chai';

const rcsCstRepo = new RcsCstRepo();

transact('createOrUpdate', () => {
  test('creates and updates', async () => {
    await rcsCstRepo.createOrUpdate([{ id: 'cst1', score: 20 }], 'rc1');
    expect(await getCount(RcsCst)).to.equal(1);
    let cst1 = (
      await RcsCst.query().where('cst_id', 'cst1').firstOrFail()
    ).serialize();
    delete cst1.id;
    expectExceptTimestamp(cst1, { cst_id: 'cst1', rcs_id: 'rc1', score: 20 });

    // updates
    await rcsCstRepo.createOrUpdate(
      [
        { id: 'cst1', score: 30 },
        { id: 'cst2', score: 90 },
      ],
      'rc1'
    );
    // console.log((await RcsCst.all()).map((i) => i.serialize()));
    expect(await getCount(RcsCst)).to.equal(2);
    cst1 = (
      await RcsCst.query().where('cst_id', 'cst1').firstOrFail()
    ).serialize();
    delete cst1.id;
    expectExceptTimestamp(cst1, { cst_id: 'cst1', rcs_id: 'rc1', score: 30 });

    const cst2 = (
      await RcsCst.query().where('cst_id', 'cst2').firstOrFail()
    ).serialize();
    delete cst2.id;
    expectExceptTimestamp(cst2, { cst_id: 'cst2', rcs_id: 'rc1', score: 90 });
  });
});
