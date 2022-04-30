import { TotalModule } from './../total/TotalModule';
import { OutputModule } from './../output/OutputModule';
import { EntryModule } from './../entry/EntryModule';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './Reservation';
import { ReservationController } from './ReservationController';
import { ReservationProduct } from './ReservationProduct';
import { ReservationService } from './ReservationService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation,ReservationProduct]),
    EntryModule,
    forwardRef(()=> OutputModule),
    forwardRef(()=> TotalModule
    )


  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: [ReservationService]
})
export class ReservationModule {}
