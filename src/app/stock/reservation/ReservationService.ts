import { TotalService } from './../total/TotalService';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs'
import { LessThanOrEqual, Repository } from 'typeorm';
import { OutputService } from '../output/OutputService';
import { Reservation } from './Reservation';
import { CreateReservationDto } from './ReservationDto';
import { ReservationProduct } from './ReservationProduct';
import { Output } from './../output/Output';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,

    @InjectRepository(ReservationProduct)
    private reservationProductRepository: Repository<ReservationProduct>,

    private outputService: OutputService,

    private totalService: TotalService

  ) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  deleteExpired(): void {

    this.reservationRepository.delete({
      validUntil: LessThanOrEqual(dayjs().toDate())
    })
  }


  async create(data: CreateReservationDto): Promise<Reservation> {
    let valid = dayjs().add(data.timeInHours, 'h').toDate();
    console.log(valid);
    return this.reservationRepository.save({
      validUntil: valid
    }).then(async (r) => {
      for (const p of data.products) {
          let {total} = await this.totalService.getTotal(p.sku);
          if( p.amount > total){
            this.remove( r.id );
            throw new ForbiddenException(p.sku + " only has " + total + " remaining units in stock");
          }

          if(total <= 0){
            this.remove(r.id);
            throw new ForbiddenException(p.sku + " is out of stock");
          }

          await this.reservationProductRepository.save({
            amount: p.amount,
            sku: p.sku,
            reservation: r,
          })
      }

      return this.findOne(r.id);
    });

  }

  async confirm(id: string){
    return this.findOne(id).then(async (r)=>{
      let outputs: Output[]= [];
      this.remove(r.id);
      for(const p of r.reservationProduct){
        outputs.push(await this.outputService.create({amount: p.amount,sku: p.sku}));
      }
      return outputs;
    });
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async findOne(id: string): Promise<Reservation> {
    return this.reservationRepository.findOneOrFail(id)
    .then((reservation)=>{
      return reservation;
    }).catch(()=>{
      throw new NotFoundException("Reservation not found!");
    });
  }

  findBy(criteria: any): Promise<Reservation[]> {
    return this.reservationRepository.find(criteria);
  }

  async remove(id: string): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}