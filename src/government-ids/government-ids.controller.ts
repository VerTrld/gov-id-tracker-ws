import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GovernmentIdsService } from './government-ids.service';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';
import { UpdateGovernmentIdDto } from './dto/update-government-id.dto';

@Controller('government-ids')
export class GovernmentIdsController {
  constructor(private readonly governmentIdsService: GovernmentIdsService) {}

  @Post('/create/one')
  create(@Body() createGovernmentIdDto: CreateGovernmentIdDto) {
    return this.governmentIdsService.create(createGovernmentIdDto);
  }

  @Get('/read/all')
  async findAll() {
    return await this.governmentIdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.governmentIdsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGovernmentIdDto: UpdateGovernmentIdDto,
  ) {
    return this.governmentIdsService.update(id, updateGovernmentIdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.governmentIdsService.remove(+id);
  }
}
