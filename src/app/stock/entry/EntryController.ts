import { Controller, Get, Post, Body,  Param, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'src/app/interceptors/TransformInterceptor';
import { CreateEntryDto } from './EntryDto';
import { EntryService } from './EntryService';


@UseInterceptors(new TransformInterceptor())
@Controller('entry')
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post()
  create(@Body() data: CreateEntryDto) {
    return this.entryService.create(data);
  }

  @Get()
  findAll() {
    return this.entryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entryService.findOne(id);
  }
}
