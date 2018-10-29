import { Get, Controller, Param, Post, Body, Patch, Delete, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get('search')
  async search( @Query() example: any): Promise<Product> {
    return await this.productsService.search(example);
  }

  @Get('most-expensive')
  async getMostExpensive(): Promise<Product> {
    return await this.productsService.getMostExpensive();
  }

  @Get(':id')
  async findById( @Param('id') id ): Promise<Product> {
    return await this.productsService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async save( @Body() entity: Product): Promise<Product> {
    return await this.productsService.save(entity);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async update( @Body() entity: Product): Promise<Product> {
    return await this.productsService.update(entity);
  }

  @Delete(':id')
  async delete( @Param('id') id ): Promise<void> {
    await this.productsService.delete(id);
  }
}
