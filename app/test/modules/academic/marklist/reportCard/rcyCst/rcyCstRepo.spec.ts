import test from 'japa';
// import RcyCstRepo from 'app/modules/academic/marklist/reportCard/rcyCst/rcyCstRepo';
import { expectExceptTimestamp, transact } from 'app/test/testUtils';
import { expect } from 'chai';
import { getCount } from 'app/services/utils';
import RcyCst from 'app/modules/academic/marklist/reportCard/rcyCst/rcyCst';

// const rcyCstRepo = new RcyCstRepo();

transact('createOrUpdate', () => {
  test('creates and updates', async () => {
    // await rcyCstRepo.createOrUpdate([{ id: 'cst1', score: 20 }], 'rc1');
    expect(await getCount(RcyCst)).to.equal(1);
    let cst1 = (
      await RcyCst.query().where('cst_id', 'cst1').firstOrFail()
    ).serialize();
    delete cst1.id;
    expectExceptTimestamp(cst1, { cst_id: 'cst1', rcy_id: 'rc1', score: 20 });
    // updates
    // await rcyCstRepo.createOrUpdate(
    //   [
    //     { id: 'cst1', score: 30 },
    //     { id: 'cst2', score: 90 },
    //   ],
    //   'rc1'
    // );

    expect(await getCount(RcyCst)).to.equal(2);
    cst1 = (
      await RcyCst.query().where('cst_id', 'cst1').firstOrFail()
    ).serialize();
    delete cst1.id;
    expectExceptTimestamp(cst1, { cst_id: 'cst1', rcy_id: 'rc1', score: 30 });
    const cst2 = (
      await RcyCst.query().where('cst_id', 'cst2').firstOrFail()
    ).serialize();
    delete cst2.id;
    expectExceptTimestamp(cst2, { cst_id: 'cst2', rcy_id: 'rc1', score: 90 });
  });
});
