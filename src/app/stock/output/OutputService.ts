import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/ProductService';
import { Output } from './Output';
import { CreateOutputDto } from './OutputDto';

@Injectable()
export class OutputService {
  constructor(
    @InjectRepository(Output)
    private outputRepository: Repository<Output>,
    private productService: ProductService
  ) {}

  async create(data: CreateOutputDto): Promise<Output>{
    let product = await this.productService.findOne(data.product);
    
    if(product.total <= 0){
      throw new ForbiddenException(product.name + " is out of stock");
    }

    if(data.amount > product.total){
      throw new ForbiddenException(product.name + " only has " + product.total + " units remaining in stock");
    }

    return this.outputRepository.save({
      product: product,
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