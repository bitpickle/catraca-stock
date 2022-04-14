import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutputModule } from '../output/OutputModule';
import { ProductModule } from '../product/ProductModule';
import { Reservation } from './Reservation';
import { ReservationController } from './ReservationController';
import { ReservationProduct } from './ReservationProduct';
import { ReservationService } from './ReservationService';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation,ReservationProduct]),
    ProductModule,
    OutputModule
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
  exports: []
})
export class ReservationModule {}
