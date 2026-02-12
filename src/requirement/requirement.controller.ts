import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { CreateRequirementDto } from './dto/create-requirement.dto';
import { UpdateRequirementDto } from './dto/update-requirement.dto';
import { RequirementService } from './requirement.service';

@Controller('requirement')
export class RequirementController {
  constructor(private readonly requirementService: RequirementService) {}

  @Post('/create/one')
  create(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Body() createRequirementDto: CreateRequirementDto,
  ) {
    return this.requirementService.baseCreate(
      ownerId,
      userId,
      createRequirementDto,
    );
  }

  @Get('/read/all')
  async findAll(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
  ) {
    return await this.requirementService.findAll(ownerId, userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requirementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequirementDto: UpdateRequirementDto,
  ) {
    return this.requirementService.update(+id, updateRequirementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requirementService.remove(+id);
  }
}
