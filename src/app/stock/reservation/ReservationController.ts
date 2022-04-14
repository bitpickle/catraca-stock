import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Reservation } from './Reservation';
import { CreateReservationDto } from './ReservationDto';
import { ReservationService } from './ReservationService';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() data: CreateReservationDto) {
    return this.reservationService.create(data);
  }

  @Post(':id')
  confirm(@Param('id') id: string) {
    return this.reservationService.confirm(id);
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
