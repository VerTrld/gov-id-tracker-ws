import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IdTypesService } from './id-type.service';
import { CreateIdTypeDto } from './dto/create-id-type.dto';
import { OwnerIdParam } from 'src/params/OwnerIdParam';
import { UserIdParam } from 'src/params/UserIdParam';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('id-types')
export class IdTypesController {
  constructor(private readonly idTypesService: IdTypesService) {}

  // Create new ID Type
  @Post('/create/one')
  create(@Body() createIdTypeDto: CreateIdTypeDto) {
    return this.idTypesService.create(createIdTypeDto);
  }

  // Get all ID Types
  @Get('/read/all')
  findAll(@OwnerIdParam() ownerId: string, @UserIdParam() userId: string) {
    return this.idTypesService.findAll(ownerId, userId);
  }

  // Get one ID Type with requirements
  @Get('/read/:idTypeCode')
  async findOne(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Param('idTypeCode') idTypeCode: string,
  ) {
    return this.idTypesService.findOne(ownerId, userId, idTypeCode);
  }

  // Delete ID Type
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.idTypesService.remove(id);
  }
}
