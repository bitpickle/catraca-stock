import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './Entry';
import { EntryController } from './EntryController';
import { EntryProduct } from './EntryProduct';
import { EntryService } from './EntryService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry,EntryProduct])
  ],
  controllers: [EntryController],
  providers: [EntryService],
  exports: [EntryService]
})
export class EntryModule {}
