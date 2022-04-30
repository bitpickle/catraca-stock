import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async create(data: CreateEntryDto): Promise<Entry>{
    return this.entryRepository.save({
      nf: data.nf
    }).then(async (e) => {
      for (const p of data.products ) {
          await this.entryProductRepository.save({
            amount: p.amount,
            sku: p.sku,
            entry: e
          })
      }

      return this.findOne(e.id);
    });
  }

  findAll(): Promise<Entry[]> {
    return this.entryRepository.find();
  }

  async findOne(id: string): Promise<Entry> {
    let oneEntry = await this.entryRepository.findOne(id);
    if ( oneEntry == undefined) {
      throw new NotFoundException("Entry not found");
    }
    return oneEntry;
  }

  findBy(criteria: any): Promise<Entry[]> {
    return this.entryRepository.find(criteria);
  }
}