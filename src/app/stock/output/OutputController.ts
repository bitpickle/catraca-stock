import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateOutputDto } from './OutputDto';
import { OutputService } from './OutputService';


@Controller('output')
export class OutputController {
  constructor(private readonly outputService: OutputService) {}

  @Post()
  create(@Body() data: CreateOutputDto) {
    return this.outputService.create(data);
  }

  @Get()
  findAll() {
    return this.outputService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.outputService.findOne(id);
  }
}
