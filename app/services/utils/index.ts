import _ from 'lodash';
import Database from '@ioc:Adonis/Lucid/Database';
import Model from 'app/modules/_shared/model';

export const pickFields = (data: any, fields: string[]) => {
  return _.pick(data as object, fields);
};

export const getAuthGuard = () => 'auth:api,basic';
// process.env.NODE_ENV === 'testing' ? 'auth:basic,api' : 'auth:basic,api';

export const getCount = async (model: typeof Model): Promise<number> => {
  // return (await model.query().count('* as count').firstOrFail()).serialize();
  return (await model.query().count('* as total'))[0].$extras.total;
};

export const getQueryCount = async (query: any) => {
  return (await query.count('* as total'))[0].$extras.total;
};

export const getAll = async (model: typeof Model) => {
  return (await model.all()).map((i) => i.serialize());
};

export const getOne = async (model: typeof Model, id: string) => {
  return (await model.findOrFail(id)).serialize();
};

export const allPromises = async (items: any[], cb: Function) => {
  const promises: Promise<any>[] = [];
  items.forEach((item) => promises.push(cb(item)));
  await Promise.all(promises);
};

export const transactify = async (cb: Function) => {
  if (process.env.NODE_ENV !== 'testing') {
    await Database.beginGlobalTransaction();
    try {
      await cb();
      await Database.commitGlobalTransaction();
      // await Database.rollbackGlobalTransaction();
      console.log('FIN TRANS');
    } catch (err) {
      console.log('FAIL TRANS', err);
      await Database.rollbackGlobalTransaction();
      throw err;
    }
  } else {
    await cb();
  }
};

export const transactLocalized = async (cb: (TransactionContract) => {}) => {
  const trx = await Database.transaction();
  try {
    await cb(trx);
    await trx.commit();
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

export const mergeKeyedObjects = (keys: string[], objects: any[]) => {
  const mappedData = {};
  keys.forEach((key) => {
    mappedData[key] = {};
    objects.forEach((item: object) => {
      if (item[key]) {
        mappedData[key] = { ...mappedData[key], ...item[key] };
      }
    });
  });

  return mappedData;
};

export const pooledPromises = async (
  promises: Promise<any>[],
  loopCount: number
) => {
  for (let i = 0; i < promises.length; i += loopCount) {
    await promises[i];
  }
};
