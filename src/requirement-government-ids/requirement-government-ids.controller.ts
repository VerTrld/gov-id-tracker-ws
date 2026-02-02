import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RequirementGovernmentIdsService } from './requirement-government-ids.service';
import { CreateRequirementGovernmentIdDto } from './dto/create-requirement-government-id.dto';
import { UpdateRequirementGovernmentIdDto } from './dto/update-requirement-government-id.dto';

@Controller('requirement-government-ids')
export class RequirementGovernmentIdsController {
  constructor(
    private readonly requirementGovernmentIdsService: RequirementGovernmentIdsService,
  ) {}

  @Post('/create/one')
  async create(
    @Body() createRequirementGovernmentIdDto: CreateRequirementGovernmentIdDto,
  ) {
    return await this.requirementGovernmentIdsService.baseCreate(
      createRequirementGovernmentIdDto,
    );
  }

  @Get()
  findAll() {
    return this.requirementGovernmentIdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementGovernmentIdsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequirementGovernmentIdDto: UpdateRequirementGovernmentIdDto,
  ) {
    return this.requirementGovernmentIdsService.update(
      +id,
      updateRequirementGovernmentIdDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requirementGovernmentIdsService.remove(+id);
  }
}
