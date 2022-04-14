import { Controller, Get, Post, Body,  Param } from '@nestjs/common';
import { CreateEntryDto } from './EntryDto';
import { EntryService } from './EntryService';


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
