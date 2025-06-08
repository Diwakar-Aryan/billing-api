// src/base/mongo-base.repository.ts
import { FilterQuery, Model, UpdateQuery } from 'mongoose';

export class BaseRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async find(filter: FilterQuery<T>, select = '', sort = {}): Promise<T[]> {
    return this.model.find(filter, select).sort(sort).exec();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>, select = ''): Promise<T | null> {
    return this.model.findOne(filter, select).exec();
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data);
  }

  async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }


  async deleteOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }

  async paginate(filter: FilterQuery<T>, limit = 10, page = 1): Promise<{ results: T[]; total: number }> {
    const skip = (page - 1) * limit;
    const [results, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).exec(),
      this.model.countDocuments(filter).exec()
    ]);
    return { results, total };
  }
}
