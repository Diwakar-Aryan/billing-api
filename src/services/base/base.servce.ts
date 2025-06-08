import { BaseRepository } from '@/repositories/base/base.repository';
import { FilterQuery } from 'mongoose';

export class BaseService<T> {
  protected repository: BaseRepository<T>;

  constructor(repository: BaseRepository<T>) {
    this.repository = repository;
  }

  getAll(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.repository.find(filter);
  }

  getById(id: string): Promise<T | null> {
    return this.repository.findById(id);
  }

  getOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.repository.findOne(filter);
  }

  create(data: Partial<T>): Promise<T> {
    return this.repository.create(data);
  }

  update(id: string, data: Partial<T>): Promise<T | null> {
    return this.repository.updateOne({ _id: id }, data);
  }

  delete(id: string): Promise<T | null> {
    return this.repository.deleteOne({ _id: id });
  }

  count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.repository.count(filter);
  }

  paginate(filter: FilterQuery<T> = {}, limit = 10, page = 1) {
    return this.repository.paginate(filter, limit, page);
  }
}
