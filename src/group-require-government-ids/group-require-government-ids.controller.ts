import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupRequireGovernmentIdsService } from './group-require-government-ids.service';
import { CreateGroupRequireGovernmentIdDto } from './dto/create-group-require-government-id.dto';
import { UpdateGroupRequireGovernmentIdDto } from './dto/update-group-require-government-id.dto';

@Controller('group-require-government-ids')
export class GroupRequireGovernmentIdsController {
  constructor(
    private readonly groupRequireGovernmentIdsService: GroupRequireGovernmentIdsService,
  ) {}

  @Post()
  create(
    @Body()
    createGroupRequireGovernmentIdDto: CreateGroupRequireGovernmentIdDto,
  ) {
    return this.groupRequireGovernmentIdsService.baseCreate(
      createGroupRequireGovernmentIdDto,
    );
  }

  @Get()
  findAll() {
    return this.groupRequireGovernmentIdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupRequireGovernmentIdsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateGroupRequireGovernmentIdDto: UpdateGroupRequireGovernmentIdDto,
  ) {
    return this.groupRequireGovernmentIdsService.update(
      +id,
      updateGroupRequireGovernmentIdDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupRequireGovernmentIdsService.remove(+id);
  }
}
