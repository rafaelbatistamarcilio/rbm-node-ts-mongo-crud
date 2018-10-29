import { ObjectID } from 'mongodb';
import { Injectable, Logger } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './product.entity';
import { BusinessException } from './../core/businnes.exception';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductsService {

  constructor(private productsRepository: ProductsRepository) {

  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async findById(id: string): Promise<Product> {
    return await this.productsRepository.findById(new ObjectId(id));
  }

  async search(example: Product): Promise<Product> {
    return await this.productsRepository.search(example);
  }

  async save(entity: Product): Promise<Product> {
    return await this.productsRepository.save(entity);
  }

  async update(entity: Product): Promise<Product> {
    try {
      const older = await this.productsRepository.findById(entity.getId());

      if (!older) {
        throw new BusinessException('product id ' + entity.getId() + ' not exists');
      }

      return await this.productsRepository.update(entity);
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw Error('Error trying to update product');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const older = await this.productsRepository.findById(new ObjectID(id));

      if (!older) {
        throw new BusinessException('product id ' + id + ' not exists');
      }

      await this.productsRepository.delete(new ObjectID(id));
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw Error('Error trying to delete product');
    }
  }

  async getMostExpensive(): Promise<Product> {
    return await this.productsRepository.getMostExpensive();
  }
}
