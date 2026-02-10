import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserRequirementService } from './user-requirement.service';
import { CreateUserRequirementDto } from './dto/create-user-requirement.dto';
import { UpdateUserRequirementDto } from './dto/update-user-requirement.dto';

@Controller('user-requirement')
export class UserRequirementController {
  constructor(private readonly userRequirementService: UserRequirementService) {}

  @Post()
  create(@Body() createUserRequirementDto: CreateUserRequirementDto) {
    return this.userRequirementService.create(createUserRequirementDto);
  }

  @Get()
  findAll() {
    return this.userRequirementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRequirementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserRequirementDto: UpdateUserRequirementDto) {
    return this.userRequirementService.update(+id, updateUserRequirementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequirementService.remove(+id);
  }
}
