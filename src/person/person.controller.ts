import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @Post('create')
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }
  @Get('get')
  findAll() {
    return this.personService.findAll();
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.personService.remove(id);
  }
}
