import { EntryProduct } from './../entry/EntryProduct';
import { TotalController } from './TotalController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationProduct } from './../reservation/ReservationProduct';
import { Reservation } from './../reservation/Reservation';
import { TotalService } from './TotalService';
import { OutputModule } from './../output/OutputModule';
import { Module, forwardRef } from '@nestjs/common';
import { ReservationModule } from '../reservation/ReservationModule';
import { EntryModule } from '../entry/EntryModule';


@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation,ReservationProduct,EntryProduct]),
    forwardRef(()=> OutputModule),
    forwardRef(()=> ReservationModule),
    EntryModule
  ],
  controllers: [TotalController],
  providers: [TotalService],
  exports: [TotalService]
})
export class TotalModule {}
