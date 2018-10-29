import { MongoRepository } from './../core/mongo.repository';
import { Product } from './product.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository extends MongoRepository<Product> {

    private readonly COLLECTION: string = 'products';

    getCollectionName(): string{
        return this.COLLECTION;
    }

    async getMostExpensive(): Promise<Product> {
        const collection = await super.getCollection();
        const sort = await collection.find({}).sort({ price: -1 }).toArray();
        return sort[0];
    }
}