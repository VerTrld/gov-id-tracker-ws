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
import { PrismaClient } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { CreateGovernmentIdDto } from './dto/create-government-id.dto';
import { UpdateGovernmentIdDto } from './dto/update-government-id.dto';
import { GovernmentIdsService } from './government-ids.service';
@UseGuards(JwtAuthGuard)
@ApiBasicAuth()
@Controller('government-ids')
export class GovernmentIdsController {
  constructor(
    private readonly governmentIdsService: GovernmentIdsService,
    private readonly prismaClient: PrismaClient,
  ) {}

  @Post('/create/one')
  async create(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Body() createGovernmentIdDto: CreateGovernmentIdDto,
  ) {
    return await this.governmentIdsService.create(
      ownerId,
      userId,
      createGovernmentIdDto,
    );
  }

  @Get('/read/all')
  async findAll(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
  ) {
    return await this.governmentIdsService.findAll(ownerId, userId);
  }

  @Get('/read/:governmentIdsCode')
  async findOne(
    @Param('governmentIdsCode') governmentIdsCode: string,
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
  ) {
    const governmentId = await this.prismaClient.governmentIds.findFirst({
      where: {
        code: governmentIdsCode.toUpperCase(),
      },
    });
    const governmentIds = await this.governmentIdsService.findOne(
      ownerId,
      userId,
      governmentId?.id,
    );

    return governmentIds;
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
