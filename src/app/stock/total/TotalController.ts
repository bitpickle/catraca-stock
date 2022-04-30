import { TotalService } from './TotalService';
import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/app/interceptors/TransformInterceptor';


@UseInterceptors(new TransformInterceptor())
@Controller('total')
export class TotalController {
  constructor(private readonly totalService: TotalService) {}

  @Get(':sku')
  async create(@Param('sku') sku: string) {
    return {total: await this.totalService.getTotal(sku) };
  }
}