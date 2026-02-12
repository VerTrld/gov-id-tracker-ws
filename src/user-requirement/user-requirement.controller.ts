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
import { CreateUserRequirementDto } from './dto/create-user-requirement.dto';
import { UserRequirementService } from './user-requirement.service';

@UseGuards(JwtAuthGuard)
@ApiBasicAuth()
@Controller('user-requirement')
export class UserRequirementController {
  constructor(
    private readonly userRequirementService: UserRequirementService,
  ) {}

  @Post()
  create(@Body() createUserRequirementDto: CreateUserRequirementDto) {
    return this.userRequirementService.create(createUserRequirementDto);
  }

  @Get()
  findAll() {
    return this.userRequirementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRequirementService.findOne(+id);
  }

  @Patch('/update/toggle')
  update(
    @OwnerIdParam() ownerId: string,
    @UserIdParam() userId: string,
    @Body() createUserRequirementDto: any,
  ) {
    return this.userRequirementService.update(
      ownerId,
      userId,
      createUserRequirementDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRequirementService.remove(+id);
  }
}
