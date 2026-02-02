import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserGovernmentIdsService } from './user-government-ids.service';
import { CreateUserGovernmentIdDto } from './dto/create-user-government-id.dto';
import { UpdateUserGovernmentIdDto } from './dto/update-user-government-id.dto';

@Controller('user-government-ids')
export class UserGovernmentIdsController {
  constructor(private readonly userGovernmentIdsService: UserGovernmentIdsService) {}

  @Post()
  create(@Body() createUserGovernmentIdDto: CreateUserGovernmentIdDto) {
    return this.userGovernmentIdsService.create(createUserGovernmentIdDto);
  }

  @Get()
  findAll() {
    return this.userGovernmentIdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGovernmentIdsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserGovernmentIdDto: UpdateUserGovernmentIdDto) {
    return this.userGovernmentIdsService.update(+id, updateUserGovernmentIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGovernmentIdsService.remove(+id);
  }
}
