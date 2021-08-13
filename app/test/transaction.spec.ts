import User from 'app/modules/auth/user';
import { getCount, transactLocalized } from 'app/services/utils';
import { expect } from 'chai';
import test from 'japa';
import { UserFactory } from './modules/auth/userFactory';
import { transact } from './testUtils';

transact('Transaction', () => {
  test('test1', async () => {
    await UserFactory.create();
    // console.log('C1', await getCount(User));
    expect(await getCount(User)).to.equal(1);
  });

  test('test2', async () => {
    // console.log('C2', await getCount(User));
    expect(await getCount(User)).to.equal(0);
  });

  test('test3', async () => {
    const uData = await UserFactory.make();
    await transactLocalized(async (trx) => {
      const user = new User();
      user.useTransaction(trx);
      user.fill({
        ...uData.serialize(),
        password: 'secret',
      });
      await user.save();
    });

    // console.log('C3', await getCount(User));
    expect(await getCount(User)).to.equal(1);
  });

  test('test4', async () => {
    // console.log('C4', await getCount(User));
    expect(await getCount(User)).to.equal(0);
  });

  test('test5', async () => {
    const uData = await UserFactory.make();
    try {
      await transactLocalized(async (trx) => {
        const user = new User();
        user.useTransaction(trx);
        user.fill({
          ...uData.serialize(),
          password: 'secret',
        });
        await user.save();

        throw new Error('Some ERror');
      });
    } catch (_err) {}

    expect(await getCount(User)).to.equal(0);
  });
});
