import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { StockModule } from './app/stock/StockModule';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StockModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule{
  constructor(private connection: Connection) {}
}
