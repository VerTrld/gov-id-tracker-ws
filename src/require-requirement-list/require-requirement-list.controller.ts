import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RequireRequirementListService } from './require-requirement-list.service';
import { CreateRequireRequirementListDto } from './dto/create-require-requirement-list.dto';
import { UpdateRequireRequirementListDto } from './dto/update-require-requirement-list.dto';

@Controller('require-requirement-list')
export class RequireRequirementListController {
  constructor(private readonly requireRequirementListService: RequireRequirementListService) {}

  @Post()
  create(@Body() createRequireRequirementListDto: CreateRequireRequirementListDto) {
    return this.requireRequirementListService.create(createRequireRequirementListDto);
  }

  @Get()
  findAll() {
    return this.requireRequirementListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requireRequirementListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRequireRequirementListDto: UpdateRequireRequirementListDto) {
    return this.requireRequirementListService.update(+id, updateRequireRequirementListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requireRequirementListService.remove(+id);
  }
}
