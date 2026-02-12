import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateRequirementListDto } from './dto/create-requirement-list.dto';
import { UpdateRequirementListDto } from './dto/update-requirement-list.dto';
import { RequirementListService } from './requirement-list.service';

@Controller('requirement-list')
export class RequirementListController {
  constructor(
    private readonly requirementListService: RequirementListService,
  ) {}

  @Post()
  create(@Body() createRequirementListDto: CreateRequirementListDto) {
    return this.requirementListService.create(createRequirementListDto);
  }

  @Get()
  findAll() {
    return this.requirementListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementListService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequirementListDto: UpdateRequirementListDto,
  ) {
    return this.requirementListService.update(+id, updateRequirementListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requirementListService.remove(+id);
  }
}
