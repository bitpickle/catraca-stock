import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './Product';
import { CreateProductDto, UpdateProductDto } from './ProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(data: CreateProductDto): Promise<Product>{
    return this.productRepository.save(data);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  findBy(criteria: any): Promise<Product[]> {
    return this.productRepository.find(criteria);
  }

  async update(id:string,data:UpdateProductDto){
    return this.productRepository.update(
      {
        id
      },
      {...data});
  }

  async remove(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}