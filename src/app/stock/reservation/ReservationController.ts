import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/app/interceptors/TransformInterceptor';
import { Reservation } from './Reservation';
import { ConfirmReservationDto, CreateReservationDto } from './ReservationDto';
import { ReservationService } from './ReservationService';

@UseInterceptors(new TransformInterceptor())
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() data: CreateReservationDto) {
    return this.reservationService.create(data);
  }

  @Post('confirm')
  confirm(@Body() data: ConfirmReservationDto) {
    return this.reservationService.confirm(data.id);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Reservation) {
    // return this.reservationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }
}
