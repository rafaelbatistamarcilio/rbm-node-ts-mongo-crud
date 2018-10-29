import { Module } from '@nestjs/common';
import { DataSource } from './datasource';

@Module({
  imports: [],
  controllers: [],
  providers: [DataSource],
  exports: [DataSource],
})
export class MongoModule { }