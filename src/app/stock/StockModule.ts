import { Module } from '@nestjs/common';
import { EntryModule } from './entry/EntryModule';
import { OutputModule } from './output/OutputModule';
import { ProductModule } from './product/ProductModule';
import { ReservationModule } from './reservation/ReservationModule';

@Module({
  imports: [
      ProductModule,
      ReservationModule,
      OutputModule,
      EntryModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class StockModule {}
