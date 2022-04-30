import { TotalModule } from './total/TotalModule';
import { Module } from '@nestjs/common';
import { EntryModule } from './entry/EntryModule';
import { OutputModule } from './output/OutputModule';
import { ReservationModule } from './reservation/ReservationModule';

@Module({
  imports: [
      ReservationModule,
      OutputModule,
      EntryModule,
      TotalModule
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class StockModule {}
