import { TotalService } from './../total/TotalService';
import { ReservationService } from './../reservation/ReservationService';
import { ForbiddenException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Output } from './Output';
import { CreateOutputDto } from './OutputDto';
@Injectable()
export class OutputService {
  constructor(
    @InjectRepository(Output)
    private outputRepository: Repository<Output>,

    @Inject(forwardRef(()=> TotalService))
    private totalService: TotalService

  ) {}

  
  async create(data: CreateOutputDto): Promise<Output>{
    let total = await this.totalService.getTotal(data.sku)
    if(total <= 0){
      throw new ForbiddenException(data.sku + " is out of stock");
    }

    if(data.amount > total){
      throw new ForbiddenException(data.sku + " only has " + total + " units remaining in stock");
    }

    return this.outputRepository.save({
      sku: data.sku,
      amount: data.amount,
    });
  }

  findAll(): Promise<Output[]> {
    return this.outputRepository.find();
  }

  findOne(id: string): Promise<Output> {
    return this.outputRepository.findOne(id);
  }

  findBy(criteria: any): Promise<Output[]> {
    return this.outputRepository.find(criteria);
  }
}