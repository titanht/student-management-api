import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import Model from './model';
import SearchService from './searchService';

export class Repo<T extends Model> {
  constructor(protected model: typeof Model) {}

  async findAll() {
    return this.model.all();
  }

  async paginate(page: number, perPage: number) {
    return this.model.query().paginate(page, perPage);
  }

  async findOne(id: string) {
    return this.model.findOrFail(id);
  }

  async createModel(data: Partial<T>) {
    return this.model.create(data);
  }

  async createModelTrx(trx: TransactionClientContract, data: Partial<T>) {
    return this.model.create(data, trx);
  }

  async updateOrCreateModel(searchData: Partial<T>, data: Partial<T>) {
    return this.model.updateOrCreate(searchData, data);
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

  async findOneDetail(id: string, searchParams: Record<string, any>) {
    return SearchService.search(this.model, searchParams)
      .where('id', id)
      .firstOrFail();
  }

  async pluck(models: Model[]) {
    return models.map((item) => item.id);
  }
}
