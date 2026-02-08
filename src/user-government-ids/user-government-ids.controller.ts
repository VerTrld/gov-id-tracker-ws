import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserGovernmentIdsService } from './user-government-ids.service';
import { CreateUserGovernmentIdDto } from './dto/create-user-government-id.dto';
import { UpdateUserGovernmentIdDto } from './dto/update-user-government-id.dto';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';

@Controller('user-government-ids')
export class UserGovernmentIdsController {
  constructor(
    private readonly userGovernmentIdsService: UserGovernmentIdsService,
  ) {}

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

  @Patch('/update/toggle/:userGovernmentId')
  async update(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Param('userGovernmentId') userGovernmentId: string,
  ) {
    return await this.userGovernmentIdsService.updateToggle(
      ownerId,
      userId,
      userGovernmentId,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGovernmentIdsService.remove(+id);
  }
}
