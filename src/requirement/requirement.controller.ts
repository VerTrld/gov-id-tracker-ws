import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RequirementsService } from './requirement.service';
import { CreateRequirementDto } from './dto/create-requirement.dto';

@Controller('requirements')
export class RequirementsController {
  constructor(private readonly requirementsService: RequirementsService) {}

  // Create Requirement
  @Post()
  create(@Body() createRequirementDto: CreateRequirementDto) {
    return this.requirementsService.create(createRequirementDto);
  }

  // Get All Requirements
  @Get('/read/all')
  findAll() {
    return this.requirementsService.findAll();
  }

  // Get Single Requirement
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementsService.findOne(id);
  }

  // Update Requirement
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      name?: string;
      description?: string;
    },
  ) {
    return this.requirementsService.update(id, body);
  }

  // Delete Requirement
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requirementsService.remove(id);
  }
}
