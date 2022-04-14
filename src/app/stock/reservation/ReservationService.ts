import { ForbiddenException, GoneException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs'
import * as timezone from 'dayjs/plugin/timezone';
import { Repository } from 'typeorm';
import { Output } from '../output/Output';
import { OutputService } from '../output/OutputService';
import { ProductService } from '../product/ProductService';
import { Reservation } from './Reservation';
import { CreateReservationDto } from './ReservationDto';
import { ReservationProduct } from './ReservationProduct';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,

    @InjectRepository(ReservationProduct)
    private reservationProductRepository: Repository<ReservationProduct>,

    private productService: ProductService,

    private outputService: OutputService
  ) {}

  async create(data: CreateReservationDto): Promise<Reservation> {
    let valid = dayjs().add(data.timeInHours, 'h').toDate();
    console.log(valid);
    return this.reservationRepository.save({
      validUntil: valid
    }).then(async (r) => {
      for (const p of data.products) {
          let product = await this.productService.findOne(p.id);

          if(p.amount > product.total){
            this.remove(r.id);
            throw new ForbiddenException(product.name + " only has " + product.total + " remaining units in stock");
          }

          if(product.total <= 0){
            this.remove(r.id);
            throw new ForbiddenException(product.name + " is out of stock");
          }

          await this.reservationProductRepository.save({
            amount: p.amount,
            product: product,
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
        outputs.push(await this.outputService.create({amount: p.amount,product: p.product.id}));
      }
      return outputs;
    });
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async findOne(id: string): Promise<Reservation> {
    let reservation = this.reservationRepository.findOne(id);
    if(dayjs((await reservation).validUntil).toDate() <= dayjs().toDate()){
      this.remove((await reservation).id);
      throw new GoneException("This reservation has expired.");
    }
    
    return reservation;
  }

  findBy(criteria: any): Promise<Reservation[]> {
    return this.reservationRepository.find(criteria);
  }

  async remove(id: string): Promise<void> {
    await this.reservationRepository.delete(id);
  }
}