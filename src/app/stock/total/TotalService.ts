import { EntryProduct } from './../entry/EntryProduct';
import { EntryService } from './../entry/EntryService';
import { OutputService } from './../output/OutputService';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationProduct } from '../reservation/ReservationProduct';
import { Inject, forwardRef, Injectable } from '@nestjs/common';
import { Entry } from '../entry/Entry';
import { Output } from '../output/Output';

@Injectable()
export class TotalService {
  constructor(
    @InjectRepository(ReservationProduct)
    private reservationProductRepository: Repository<ReservationProduct>,

    @Inject(forwardRef(() => OutputService))
    private outputService: OutputService,

    @InjectRepository(EntryProduct)
    private entryProductRepository: Repository<EntryProduct>
  ) { }

  async getTotal(sku: string) {
    let total: number = 0;

    let entries =
      await this.entryProductRepository.find({ where: { sku: sku } });
    let outputs: Output[] = await this.outputService.findBy({ where: { sku: sku } });
    let reservations: ReservationProduct[] =
      await this.reservationProductRepository.find({ where: { sku: sku } });

    if (entries != undefined) {
      for (const p of entries) {
        total += p.amount;
      }
    }

    if (outputs != undefined) {
      for (const p of outputs) {
        total -= p.amount;
      }
    }

    if (reservations != undefined) {
      for (const p of reservations) {
        total -= p.amount;
      }
    }
    return total;
  }
}
