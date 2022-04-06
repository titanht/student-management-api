import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Model from './model';
import SearchService from './searchService';

export class Repo<T extends Model> {
  constructor(public model: typeof Model) {}

  async findAll() {
    return this.model.all() as Promise<T[]>;
  }

  async paginate(page: number, perPage: number) {
    return this.model.query().paginate(page, perPage);
  }

  async findFirst() {
    return this.model.first() as Promise<T>;
  }

  async findOne(id: string) {
    return this.model.findOrFail(id) as Promise<T>;
  }

  async createModel(data: Partial<T>) {
    return this.model.create(data) as Promise<T>;
  }

  async createModelTrx(trx: TransactionClientContract, data: Partial<T>) {
    return this.model.create(data, {
      client: trx,
    }) as Promise<T>;
  }

  async updateOrCreateModel(searchData: Partial<T>, data: Partial<T>) {
    return this.model.updateOrCreate(searchData, data) as Promise<T>;
  }

  async updateOrCreateModelTrx(
    trx: TransactionClientContract,
    searchData: Partial<T>,
    data: Partial<T>
  ) {
    return this.model.updateOrCreate(searchData, data, {
      client: trx,
    });
  }

  async updateModel(id: string, data: Partial<T>) {
    const instance = await this.model.findOrFail(id);
    instance.merge(data);
    await instance.save();

    return instance;
  }

  async updateModelTrx(
    trx: TransactionClientContract,
    id: string,
    data: Partial<T>
  ) {
    const instance = await this.model.findOrFail(id, trx);
    instance.useTransaction(trx);
    await instance.merge(data);
    await instance.save();

    return instance;
  }

  async deleteModel(id: string) {
    const instance = await this.model.findOrFail(id);
    await instance.delete();
  }

  async search(searchParams: Record<string, any>) {
    return SearchService.search(this.model, searchParams);
  }

  async getSearchCount(searchParams: Record<string, any>) {
    return SearchService.getSearchCount(this.model, searchParams);
  }

  async findOneDetail(id: string, searchParams: Record<string, any>) {
    // TODO: fix
    return this.findOne(id);
    // return (
    // SearchService.search(this.model, searchParams)
    //   // .where('id', id)
    //   .firstOrFail() as Promise<T>
    // );
  }

  async pluck(models: Model[]) {
    return models.map((item) => item.id);
  }

  massSerialize(models: Model[]) {
    return models.map((model) => model.serialize()) as T[];
  }
}
