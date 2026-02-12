import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBasicAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { CreateUserGovernmentIdDto } from './dto/create-user-government-id.dto';
import { UserGovernmentIdsService } from './user-government-ids.service';

@UseGuards(JwtAuthGuard)
@ApiBasicAuth()
@Controller('user-government-ids')
export class UserGovernmentIdsController {
  constructor(
    private readonly userGovernmentIdsService: UserGovernmentIdsService,
  ) {}

  @Post('/create/one')
  create(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Body() createUserGovernmentIdDto: CreateUserGovernmentIdDto,
  ) {
    return this.userGovernmentIdsService.create(
      ownerId,
      userId,
      createUserGovernmentIdDto,
    );
  }

  @Get()
  findAll() {
    return this.userGovernmentIdsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGovernmentIdsService.findOne(+id);
  }

  @Patch('')
  update() {
    return this.userGovernmentIdsService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGovernmentIdsService.remove(+id);
  }
}
