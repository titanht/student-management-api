import { AuthContract } from '@ioc:Adonis/Addons/Auth';
import { TransactionClientContract } from '@ioc:Adonis/Lucid/Database';
import _ from 'lodash';
import Model from './model';
import { Repo } from './repo';

export default class Service<T extends Model> {
  constructor(protected repo: Repo<T>) {}

  async findAll() {
    return this.repo.findAll();
  }

  async findFirst() {
    return this.repo.findFirst();
  }

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async findOneDetail(id: string, searchData: Record<string, any>) {
    return this.repo.findOneDetail(id, searchData);
  }

  async create(createData: Partial<T>, _auth?: AuthContract) {
    return this.repo.createModel(createData);
  }

  async createTrx(
    trx: TransactionClientContract,
    createData: Partial<T>,
    _auth?: AuthContract
  ) {
    return this.repo.createModelTrx(trx, createData);
  }

  async update(id: string, editData: Partial<T>) {
    return this.repo.updateModel(id, editData);
  }

  async updateTrx(
    trx: TransactionClientContract,
    id: string,
    editData: Partial<T>
  ) {
    return this.repo.updateModelTrx(trx, id, editData);
  }

  async delete(id: string) {
    return this.repo.deleteModel(id);
  }

  async paginate(requestData: Record<string, any>) {
    let { page, perPage } = requestData;
    page = _.parseInt(page) || 1;
    perPage = _.parseInt(perPage) || 10;

    return this.repo.paginate(page, perPage);
  }

  async search(searchData: Record<string, any>) {
    return this.repo.search(searchData);
  }

  async searchCount(searchData: Record<string, any>) {
    return this.repo.getSearchCount(searchData);
  }

  getRepo() {
    return this.repo;
  }
}
