import { TotalModule } from './../total/TotalModule';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Output } from './Output';
import { OutputController } from './OutputController';
import { OutputService } from './OutputService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Output]),
    forwardRef(()=> TotalModule),

  ],
  controllers: [OutputController],
  providers: [OutputService],
  exports: [OutputService]
})
export class OutputModule {}
