import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/ProductService';
import { Entry } from './Entry';
import { CreateEntryDto } from './EntryDto';
import { EntryProduct } from './EntryProduct';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,

    @InjectRepository(EntryProduct)
    private entryProductRepository: Repository<EntryProduct>,

    private productService: ProductService
  ) {}

  async create(data: CreateEntryDto): Promise<Entry>{
    return this.entryRepository.save({
      nf: data.nf
    }).then(async (e) => {
      for (const p of data.products) {
          await this.entryProductRepository.save({
            amount: p.amount,
            product: await this.productService.findOne(p.id),
            entry: e
          })
      }

      return this.findOne(e.id);
    });
  }

  findAll(): Promise<Entry[]> {
    return this.entryRepository.find();
  }

  findOne(id: string): Promise<Entry> {
    return this.entryRepository.findOne(id);
  }

  findBy(criteria: any): Promise<Entry[]> {
    return this.entryRepository.find(criteria);
  }
}