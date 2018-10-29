import { IEntity } from './i.entity';
import { Inject } from '@nestjs/common';
import { Collection, ObjectID } from 'mongodb';
import { DataSource } from './datasource';

export abstract class MongoRepository<T extends IEntity> {

    @Inject()
    protected dataSource: DataSource;

    abstract getCollectionName(): string;

    async getCollection(): Promise<Collection<T>> {
        const db = await this.dataSource.getDb();
        return db.collection<T>(this.getCollectionName());
    }

    async findAll(): Promise<T[]> {
        const collection = await this.getCollection();
        return collection.find<T>({}).toArray();
    }

    async findById(id: ObjectID): Promise<T> {
        const collection = await this.getCollection();
        return await collection.findOne({ ['_id']: id });
    }

    async search(example: T): Promise<T> {
        const collection = await this.getCollection();
        return await collection.findOne(example);
    }

    async save(entity: T): Promise<T> {
        const collection = await this.getCollection();
        const result = await collection.insertOne(entity);
        const newId = result.insertedId;
        return await this.findById(newId);
    }

    async update(entity: T): Promise<T> {
        const collection = await this.getCollection();
        const update = {};
        Object.keys(entity).forEach(key => { if (key !== '_id') update[key] = entity[key]; });
        await collection.updateOne({ _id: entity.getId() }, { $set: update, $currentDate: { lastModified: true } });
        return await this.findById(entity.getId());
    }

    async delete(id: ObjectID): Promise<void> {
        const collection = await this.getCollection();
        await collection.deleteOne({ _id: id });
    }
}