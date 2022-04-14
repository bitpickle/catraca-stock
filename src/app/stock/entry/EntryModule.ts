import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/ProductModule';
import { Entry } from './Entry';
import { EntryController } from './EntryController';
import { EntryProduct } from './EntryProduct';
import { EntryService } from './EntryService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry,EntryProduct]),
    ProductModule
  ],
  controllers: [EntryController],
  providers: [EntryService],
  exports: []
})
export class EntryModule {}
