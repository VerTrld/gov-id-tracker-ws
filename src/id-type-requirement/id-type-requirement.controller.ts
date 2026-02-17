import { Controller, Post, Delete, Patch, Param, Body } from '@nestjs/common';
import { IdTypeRequirementsService } from './id-type-requirement.service';
import { CreateIdTypeRequirementDto } from './dto/create-id-type-requirement.dto';

@Controller('id-type-requirements')
export class IdTypeRequirementsController {
  constructor(
    private readonly idTypeRequirementsService: IdTypeRequirementsService,
  ) {}

  // Attach requirement to ID Type
  @Post('/create/one')
  create(@Body() createIdTypeRequirementDto: CreateIdTypeRequirementDto) {
    return this.idTypeRequirementsService.create(createIdTypeRequirementDto);
  }

  // Update isRequired
  @Patch('/update/one/:id')
  update(@Param('id') id: string, @Body() body: { isRequired: boolean }) {
    return this.idTypeRequirementsService.update(id, body.isRequired);
  }

  // Remove requirement from ID Type
  @Delete('/delete/one/:id')
  remove(@Param('id') id: string) {
    return this.idTypeRequirementsService.remove(id);
  }
}
