import { ProductsRepository } from './products.repository';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongoModule } from './../core/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
