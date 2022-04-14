import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from '../product/ProductModule';
import { Output } from './Output';
import { OutputController } from './OutputController';
import { OutputService } from './OutputService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Output]),
    ProductModule
  ],
  controllers: [OutputController],
  providers: [OutputService],
  exports: [OutputService]
})
export class OutputModule {}
